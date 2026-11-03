/** The steps of albums: adding their media, saving variants, building their zip, deleting expired ones. */
import { once } from "node:events";
import { PassThrough } from "node:stream";
import { ZipArchive } from "archiver";
import { and, eq, lte } from "drizzle-orm";
import { v7 as uuidv7 } from "uuid";
import { FatalError } from "workflow";
import { archiveEntries, deleteAlbum, nextPosition, publishAlbum } from "@server/albums";
import { db } from "@server/db";
import { albumEntries, albumEntryVariants, albums } from "@server/db/schema";
import { deleteObjects, deletePrefix, getObjectStream, putStream } from "@server/s3";
import { variantFile } from "@shared/images";
import { staleFiles } from "../images/steps";
import type { Readable } from "node:stream";
import type { ImageSource, ImageVariant } from "../images/steps";
import type { StoredVariant } from "@shared/images";

/**
 * A new media at the end of its directory, without variants yet: it shows as processing until they're saved. One
 * whose album or directory is gone can't be added, so it's not retried.
 */
export async function createAlbumEntry(albumId: string, parentId: string | null, filename: string) {
    "use step";

    const id = await db.transaction(async (tx) => {
        const [album] = await tx.select({ id: albums.id }).from(albums).where(eq(albums.id, albumId));
        if (!album) return null;
        if (parentId) {
            const [parent] = await tx.select({ id: albumEntries.id })
                .from(albumEntries)
                .where(and(eq(albumEntries.id, parentId), eq(albumEntries.albumId, albumId), eq(albumEntries.type, "directory")));
            if (!parent) return null;
        }

        const position = await nextPosition(tx, albumId, parentId);
        const [entry] = await tx.insert(albumEntries)
            .values({ albumId, parentId, position, type: "media", filename })
            .returning({ id: albumEntries.id });
        return entry.id;
    });
    if (!id) {
        throw new FatalError(`The album ${albumId} or its directory ${parentId} is gone`);
    }

    await publishAlbum(albumId);
    return id;
}

/** A photo's stored original, to make its sizes from again; one without (a video) can't be, so it's not retried. */
export async function findAlbumOriginal(entryId: string) {
    "use step";

    const [original] = await db.select()
        .from(albumEntryVariants)
        .where(and(eq(albumEntryVariants.entryId, entryId), eq(albumEntryVariants.variant, "original")));
    if (!original?.contentType || original.contentType.startsWith("video/")) {
        throw new FatalError(`The album entry ${entryId} has no photo to make sizes from`);
    }

    const variant: ImageVariant = { variant: "original", contentType: original.contentType, width: original.width, height: original.height };
    const source: ImageSource = { bucket: "albums", key: variantFile(entryId, "original", original.contentType) };
    return { variant, source };
}

/** A video's YouTube variant, which its file is attached to; one without can't take a file, so it's not retried. */
export async function findAlbumVideo(entryId: string): Promise<StoredVariant> {
    "use step";

    const [video] = await db.select()
        .from(albumEntryVariants)
        .where(and(eq(albumEntryVariants.entryId, entryId), eq(albumEntryVariants.variant, "video")));
    if (!video) {
        throw new FatalError(`The album entry ${entryId} isn't a video`);
    }
    return { variant: "video", contentType: null, youtubeId: video.youtubeId, width: video.width, height: video.height };
}

/**
 * Saves a media's variants, which makes it show; the ones it had before and no longer does are deleted with their
 * files. With `filename`, the media's file name changes too, when a video's file is uploaded.
 */
export async function saveAlbumVariants(albumId: string, entryId: string, variants: (ImageVariant | StoredVariant)[], filename?: string) {
    "use step";

    const rows = variants.map((variant) => ({ youtubeId: null, ...variant }));
    const before = await db.transaction(async (tx) => {
        const old = await tx.select().from(albumEntryVariants).where(eq(albumEntryVariants.entryId, entryId));
        await tx.delete(albumEntryVariants).where(eq(albumEntryVariants.entryId, entryId));
        await tx.insert(albumEntryVariants).values(rows.map((variant) => ({
            entryId,
            ...variant,
            createdAt: old.find((row) => row.variant === variant.variant)?.createdAt,
        })));
        await tx.update(albumEntries)
            .set({ updatedAt: new Date(), ...(filename ? { filename } : {}) })
            .where(eq(albumEntries.id, entryId));
        return old;
    });

    const files = (list: { variant: string; contentType: string | null; width: number; height: number }[]) =>
        list.filter((row): row is ImageVariant => row.contentType !== null);
    await deleteObjects("albums", staleFiles(entryId, files(before), files(rows)));
    await publishAlbum(albumId);
}

/** A media whose processing failed, so it doesn't stay in its directory without anything to show. */
export async function removeAlbumEntry(albumId: string, entryId: string) {
    "use step";

    await deletePrefix("albums", `${entryId}/`);
    await db.delete(albumEntries).where(eq(albumEntries.id, entryId));
    await publishAlbum(albumId);
}

//
// the zip
//

/**
 * Builds the whole album's zip: every file under its directories' names, stored as they are (photos and videos
 * don't get smaller), read and uploaded a file at a time, so a huge album never sits in memory. Then saves what's in
 * it, to compare with the album later, and deletes the previous one.
 */
export async function buildAlbumArchive(albumId: string) {
    "use step";

    const [album] = await db.select({ title: albums.title, archive: albums.archive }).from(albums).where(eq(albums.id, albumId));
    if (!album) {
        throw new FatalError(`There's no album ${albumId}`);
    }

    const entries = await archiveEntries(albumId);
    // a new key each time, so a link to an old zip stops working once it's replaced
    const key = `archives/${uuidv7()}.zip`;

    const zip = new ZipArchive({ store: true });
    const body = new PassThrough();
    zip.pipe(body);
    const uploaded = putStream("albums", key, body, { contentType: "application/zip", filename: `${album.title}.zip` });

    for (const entry of entries) {
        const file = await getObjectStream("albums", variantFile(entry.entryId, "original", entry.contentType));
        if (!file) continue;
        zip.append(file as Readable, { name: entry.path });
        // one file at a time, so only one is being read
        await once(zip, "entry");
    }
    await zip.finalize();
    const size = await uploaded;

    await db.update(albums)
        .set({
            archive: {
                key,
                builtAt: new Date().toISOString(),
                size,
                entries: entries.map(({ entryId, path, updatedAt }) => ({ entryId, path, updatedAt })),
            },
            archiveStatus: "idle",
        })
        .where(eq(albums.id, albumId));
    if (album.archive) await deleteObjects("albums", [album.archive.key]);
    await publishAlbum(albumId);
}

/** Marks an album's zip as failed, so the admin can try again. */
export async function failAlbumArchive(albumId: string) {
    "use step";

    await db.update(albums).set({ archiveStatus: "failed" }).where(eq(albums.id, albumId));
    await publishAlbum(albumId);
}

//
// deleting
//

/** The albums whose deletion date has passed. */
export async function findExpiredAlbums() {
    "use step";

    const expired = await db.select({ id: albums.id }).from(albums).where(lte(albums.deleteAt, new Date()));
    return expired.map((album) => album.id);
}

/** Deletes one expired album, with its files and its zip; one already gone is fine. */
export async function deleteExpiredAlbum(albumId: string) {
    "use step";

    await deleteAlbum(albumId);
}
