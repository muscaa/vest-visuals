import { and, eq } from "drizzle-orm";
import { db } from "@server/db";
import { publish } from "@server/events";
import { uploads } from "@server/db/schema";
import { uploadTarget } from "@shared/uploads";
import type { UploadStatus, UploadTarget } from "@shared/uploads";

/**
 * An upload with its type and data parsed, so what it's for can be trusted; null when there's none. Only the user who
 * started it gets it when `userId` is given.
 */
export async function findUpload(id: string, userId?: string) {
    const [row] = await db.select().from(uploads).where(userId ? and(eq(uploads.id, id), eq(uploads.userId, userId)) : eq(uploads.id, id));
    if (!row) return null;

    return { ...row, ...uploadTarget.parse({ type: row.type, data: row.data }) };
}

export type Upload = NonNullable<Awaited<ReturnType<typeof findUpload>>>;

/**
 * Moves an upload on to `status`, only from `from`; false when it wasn't there anymore. Two requests can't both move
 * it, so e.g. a double click can't start two workflows.
 */
export async function moveUpload(id: string, from: UploadStatus, status: UploadStatus) {
    const moved = await db.update(uploads)
        .set({ status })
        .where(and(eq(uploads.id, id), eq(uploads.status, from)))
        .returning({ id: uploads.id });
    return moved.length > 0;
}

/** Tells the pages showing what an upload is for that its status changed, e.g. the assets page for an asset. */
export async function publishUploadChange(target: UploadTarget) {
    switch (target.type) {
        case "asset":
            await publish("assets", { key: target.data.key });
            break;
        case "portfolio":
            await publish("portfolio", {});
            break;
        case "album":
        case "album_video":
            await publish("albums", { albumId: target.data.albumId });
            break;
    }
}
