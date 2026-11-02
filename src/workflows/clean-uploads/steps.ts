import { and, eq, inArray, lt } from "drizzle-orm";
import { db } from "@server/db";
import { uploads } from "@server/db/schema";
import { abortMultipartUpload, listMultipartUploads } from "@server/s3";

/** An upload still going after this long was given up on */
const abandonedAfter = 24 * 60 * 60 * 1000;

/** The parts of every multipart upload started over a day ago; with or without a row, they won't be completed. */
export async function abortStaleMultipartUploads() {
    "use step";

    const before = new Date(Date.now() - abandonedAfter);
    let aborted = 0;
    for await (const upload of listMultipartUploads("uploads")) {
        if (upload.startedAt && upload.startedAt < before) {
            await abortMultipartUpload("uploads", upload.key, upload.multipartId);
            aborted++;
        }
    }
    return aborted;
}

/** The rows of uploads started over a day ago and never completed. */
export async function deleteAbandonedUploads() {
    "use step";

    const before = new Date(Date.now() - abandonedAfter);
    const abandoned = await db.select({ id: uploads.id, multipartId: uploads.multipartId })
        .from(uploads)
        .where(and(eq(uploads.status, "pending"), lt(uploads.createdAt, before)));

    // in case S3 didn't list them, e.g. on a provider that lists differently
    for (const upload of abandoned) {
        await abortMultipartUpload("uploads", upload.id, upload.multipartId);
    }
    if (abandoned.length) {
        await db.delete(uploads).where(inArray(uploads.id, abandoned.map((upload) => upload.id)));
    }
    return abandoned.length;
}
