/** The steps every type of upload goes through. */
import { eq } from "drizzle-orm";
import { FatalError } from "workflow";
import { db } from "@server/db";
import { uploads } from "@server/db/schema";
import { deleteObjects } from "@server/s3";
import { findUpload, publishUploadChange } from "@server/uploads";
import type { Upload } from "@server/uploads";
import type { UploadStatus } from "@shared/uploads";

/** The upload, its type and data checked again; one that's gone or broken can't be processed, so it's not retried. */
export async function loadUpload(id: string) {
    "use step";

    try {
        const upload = await findUpload(id);
        if (upload) return upload;
    } catch (error) {
        throw new FatalError(`The upload ${id} can't be read: ${String(error)}`);
    }
    throw new FatalError(`There's no upload ${id}`);
}

/** Saves the upload's status, and tells the pages showing what it's for. */
export async function setUploadStatus(upload: Upload, status: UploadStatus) {
    "use step";

    await db.update(uploads).set({ status }).where(eq(uploads.id, upload.id));
    await publishUploadChange(upload);
}

export async function deleteUploadedFile(id: string) {
    "use step";

    await deleteObjects("uploads", [id]);
}
