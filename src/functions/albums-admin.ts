/** Clients' albums, for the admin: making them (directories, media, the cover), publishing them, their zip. */
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { and, count, desc, eq, inArray, isNull, ne } from "drizzle-orm";
import { start } from "workflow/api";
import { z } from "zod";
import {
    adminEntry,
    archiveEntries,
    deleteAlbum,
    deleteEntries,
    directoryAncestors,
    directoryPreviews,
    listEntries,
    nextPosition,
    publishAlbum,
    uniqueSlug,
    withDescendants,
} from "@server/albums";
import { db } from "@server/db";
import { albumEntries, albumEntryVariants, albums, user } from "@server/db/schema";
import { envServer } from "@server/env";
import { mailLocale, sendMail } from "@server/mail";
import { albumPublished } from "@server/mail/templates";
import { reorder } from "@server/order";
import { compareArchive } from "@shared/albums";
import { imageSizeList } from "@shared/images";
import { localizeUrl } from "@shared/paraglide/runtime";
import { youtubeShapes } from "@shared/portfolio";
import { publicUrl } from "@shared/s3";
import { adminMiddleware } from "./auth";
import type { YoutubeShape } from "@shared/portfolio";
import { reprocessAlbumEntry, syncAlbumArchiveRun } from "@/workflows/albums";

/** Every album, the newest event first, with how many photos and videos it holds. */
export const listAdminAlbums = createServerFn({ method: "GET" })
    .middleware([adminMiddleware])
    .handler(async () => {
        const rows = await db.select().from(albums).orderBy(desc(albums.date));
        const counts = await db.select({ albumId: albumEntries.albumId, count: count() })
            .from(albumEntries)
            .where(eq(albumEntries.type, "media"))
            .groupBy(albumEntries.albumId);

        return rows.map(({ archive: _, coverEntryId: __, ...album }) => ({
            ...album,
            mediaCount: counts.find((row) => row.albumId === album.id)?.count ?? 0,
        }));
    });

export type AdminAlbum = Awaited<ReturnType<typeof listAdminAlbums>>[number];

export const adminAlbumsQuery = queryOptions({
    queryKey: ["admin", "albums"],
    queryFn: () => listAdminAlbums(),
});

/** An album with one of its directories (or its root): the way there, its entries in order, how its zip compares. */
export const getAdminAlbum = createServerFn({ method: "GET" })
    .middleware([adminMiddleware])
    .validator(z.object({ id: z.uuid(), directoryId: z.uuid().optional() }))
    .handler(async ({ data }) => {
        const album = await db.query.albums.findFirst({ where: eq(albums.id, data.id) });
        if (!album) {
            throw notFound();
        }

        const directoryId = data.directoryId ?? null;
        if (directoryId) {
            const [directory] = await db.select({ id: albumEntries.id })
                .from(albumEntries)
                .where(and(eq(albumEntries.id, directoryId), eq(albumEntries.albumId, album.id), eq(albumEntries.type, "directory")));
            if (!directory) throw notFound();
        }

        const rows = await listEntries(album.id, directoryId);
        const directoryIds = rows.filter((row) => row.type === "directory").map((row) => row.id);
        const childCounts = directoryIds.length
            ? new Map((await db.select({ parentId: albumEntries.parentId, count: count() })
                .from(albumEntries)
                .where(inArray(albumEntries.parentId, directoryIds))
                .groupBy(albumEntries.parentId)).map((row) => [row.parentId!, row.count]))
            : new Map<string, number>();
        const previews = await directoryPreviews(directoryIds);

        const { archive, ...details } = album;
        return {
            album: {
                ...details,
                archive: compareArchive(archive, await archiveEntries(album.id)),
                archiveUrl: archive ? publicUrl("albums", archive.key) : null,
            },
            /** the directories from the root down to this one; empty at the root */
            path: directoryId ? await directoryAncestors(directoryId) : [],
            entries: rows.map((row) => adminEntry(row, { childCounts, previews })),
        };
    });

export const adminAlbumQuery = (id: string, directoryId?: string) => queryOptions({
    queryKey: ["admin", "albums", id, directoryId ?? "root"],
    queryFn: () => getAdminAlbum({ data: { id, directoryId } }),
});

/** Every directory of an album, for picking where to move entries. */
export const listAlbumDirectories = createServerFn({ method: "GET" })
    .middleware([adminMiddleware])
    .validator(z.object({ id: z.uuid() }))
    .handler(async ({ data }) => {
        return await db.select({ id: albumEntries.id, parentId: albumEntries.parentId, name: albumEntries.name, position: albumEntries.position })
            .from(albumEntries)
            .where(and(eq(albumEntries.albumId, data.id), eq(albumEntries.type, "directory")))
            .orderBy(albumEntries.position);
    });

export const albumDirectoriesQuery = (id: string) => queryOptions({
    queryKey: ["admin", "albums", id, "directories"],
    queryFn: () => listAlbumDirectories({ data: { id } }),
});

//
// the album
//

const details = z.object({
    title: z.string().trim().min(1).max(200),
    description: z.string().trim().max(2000).transform((value) => value || null),
    /** YYYY-MM-DD */
    date: z.iso.date(),
    email: z.string().trim().toLowerCase().transform((value) => value || null).pipe(z.email().nullable()),
});

/** A new album, as a draft: only admins see it until it's published. */
export const createAlbum = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(details)
    .handler(async ({ data }) => {
        const [album] = await db.insert(albums).values(data).returning({ id: albums.id });
        await publishAlbum(album.id);
        return { id: album.id };
    });

/** Changes an album's details, and once it's published, when it locks and is deleted. */
export const updateAlbum = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(details.extend({ id: z.uuid(), lockAt: z.coerce.date().optional(), deleteAt: z.coerce.date().optional() }))
    .handler(async ({ data: { id, ...values } }) => {
        if (values.lockAt && values.deleteAt && values.deleteAt < values.lockAt) {
            throw new Error("An album can't be deleted before it locks");
        }
        await db.update(albums).set(values).where(eq(albums.id, id));
        await publishAlbum(id);
    });

/**
 * Publishes an album: the client sees it in their account, its link works for everyone, and they get an email (when
 * it has one). When it locks and is deleted is set now, so the days spent making it don't count.
 */
export const publishAlbumById = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ id: z.uuid(), lockAt: z.coerce.date(), deleteAt: z.coerce.date() }))
    .handler(async ({ data }) => {
        if (data.deleteAt < data.lockAt) {
            throw new Error("An album can't be deleted before it locks");
        }

        const [album] = await db.update(albums)
            .set({ status: "published", publishedAt: new Date(), lockAt: data.lockAt, deleteAt: data.deleteAt })
            .where(eq(albums.id, data.id))
            .returning();
        if (!album) throw notFound();

        if (album.email) {
            // in the client's language when they have an account, else the site's default; the link opens in it too
            const [client] = await db.select({ locale: user.locale }).from(user).where(eq(user.email, album.email));
            const locale = mailLocale(client?.locale);
            const link = localizeUrl(new URL(`/albums/${album.token}`, envServer.BETTER_AUTH_URL), { locale });
            await sendMail(album.email, albumPublished(album.title, link.href, locale));
        }
        await publishAlbum(album.id);
    });

/** Back to a draft, to change something without the client seeing it half done; its dates are kept. */
export const unpublishAlbum = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ id: z.uuid() }))
    .handler(async ({ data }) => {
        await db.update(albums).set({ status: "draft" }).where(eq(albums.id, data.id));
        await publishAlbum(data.id);
    });

/** Deletes an album for good, with every file and its zip. */
export const deleteAlbumById = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ id: z.uuid() }))
    .handler(async ({ data }) => {
        await deleteAlbum(data.id);
    });

/** Builds the album's zip again from what it holds now, in the background; one at a time per album. */
export const syncAlbumArchive = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ id: z.uuid() }))
    .handler(async ({ data }) => {
        // only from idle or failed, so a second click can't start another
        const marked = await db.update(albums)
            .set({ archiveStatus: "building" })
            .where(and(eq(albums.id, data.id), ne(albums.archiveStatus, "building")))
            .returning({ id: albums.id });
        if (!marked.length) {
            throw new Error("The album's zip is already being made");
        }

        await publishAlbum(data.id);
        await start(syncAlbumArchiveRun, [data.id]);
    });

//
// its entries
//

const place = z.object({ albumId: z.uuid(), parentId: z.uuid().nullable() });

/** The directory entries go in must be one of the album's directories, or its root. */
async function checkParent(albumId: string, parentId: string | null) {
    if (!parentId) return;
    const [parent] = await db.select({ id: albumEntries.id })
        .from(albumEntries)
        .where(and(eq(albumEntries.id, parentId), eq(albumEntries.albumId, albumId), eq(albumEntries.type, "directory")));
    if (!parent) throw new Error("No such directory in this album");
}

/** A new, empty directory at the end of another (or the root). */
export const createAlbumDirectory = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(place.extend({ name: z.string().trim().min(1).max(100) }))
    .handler(async ({ data }) => {
        await checkParent(data.albumId, data.parentId);
        await db.transaction(async (tx) => {
            await tx.insert(albumEntries).values({
                albumId: data.albumId,
                parentId: data.parentId,
                position: await nextPosition(tx, data.albumId, data.parentId),
                type: "directory",
                name: data.name,
                slug: await uniqueSlug(tx, data.albumId, data.parentId, data.name),
            });
        });
        await publishAlbum(data.albumId);
    });

/** Renames a directory; its link changes with it. */
export const renameAlbumDirectory = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ albumId: z.uuid(), id: z.uuid(), name: z.string().trim().min(1).max(100) }))
    .handler(async ({ data }) => {
        await db.transaction(async (tx) => {
            const [directory] = await tx.select({ parentId: albumEntries.parentId })
                .from(albumEntries)
                .where(and(eq(albumEntries.id, data.id), eq(albumEntries.albumId, data.albumId), eq(albumEntries.type, "directory")));
            if (!directory) throw new Error("No such directory in this album");

            const slug = await uniqueSlug(tx, data.albumId, directory.parentId, data.name, data.id);
            await tx.update(albumEntries).set({ name: data.name, slug }).where(eq(albumEntries.id, data.id));
        });
        await publishAlbum(data.albumId);
    });

/** Saves the order of a directory's entries, after dragging. */
export const reorderAlbumEntries = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(place.extend({ entryIds: z.array(z.uuid()) }))
    .handler(async ({ data }) => {
        await db.transaction(async (tx) => {
            const where = and(
                eq(albumEntries.albumId, data.albumId),
                data.parentId ? eq(albumEntries.parentId, data.parentId) : isNull(albumEntries.parentId),
            );
            const current = await tx.select({ id: albumEntries.id }).from(albumEntries).where(where);
            await reorder(current.map((row) => row.id), data.entryIds, (id, position) =>
                tx.update(albumEntries).set({ position }).where(eq(albumEntries.id, id)));
        });
        await publishAlbum(data.albumId);
    });

/**
 * Moves entries to the end of another directory (or the root). A directory can't go into itself or its own
 * subdirectories; one whose slug is taken there gets another.
 */
export const moveAlbumEntries = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(place.extend({ entryIds: z.array(z.uuid()).min(1) }))
    .handler(async ({ data }) => {
        await checkParent(data.albumId, data.parentId);
        if (data.parentId && (await withDescendants(data.entryIds)).some((entry) => entry.id === data.parentId)) {
            throw new Error("A directory can't be moved into itself");
        }

        await db.transaction(async (tx) => {
            const moving = await tx.select()
                .from(albumEntries)
                .where(and(eq(albumEntries.albumId, data.albumId), inArray(albumEntries.id, data.entryIds)));
            let position = await nextPosition(tx, data.albumId, data.parentId);

            for (const entry of data.entryIds.map((id) => moving.find((row) => row.id === id)).filter((row) => row !== undefined)) {
                if (entry.parentId === data.parentId) continue;
                // out of the way first, so its slug doesn't count against itself
                const slug = entry.type === "directory" && entry.name
                    ? await uniqueSlug(tx, data.albumId, data.parentId, entry.name, entry.id)
                    : null;
                await tx.update(albumEntries).set({ parentId: data.parentId, position: position++, slug }).where(eq(albumEntries.id, entry.id));
            }
        });
        await publishAlbum(data.albumId);
    });

/** Deletes entries, a directory with everything in it, files included. */
export const deleteAlbumEntries = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ albumId: z.uuid(), entryIds: z.array(z.uuid()).min(1) }))
    .handler(async ({ data }) => {
        const owned = await db.select({ id: albumEntries.id })
            .from(albumEntries)
            .where(and(eq(albumEntries.albumId, data.albumId), inArray(albumEntries.id, data.entryIds)));
        await deleteEntries(owned.map((entry) => entry.id));
        await publishAlbum(data.albumId);
    });

/**
 * Adds a video at the end of a directory: it plays from YouTube; its file, for downloading, is uploaded to it next.
 * Returns it, for that upload.
 */
export const addAlbumYoutube = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(place.extend({
        youtubeId: z.string().regex(/^[\w-]{11}$/),
        shape: z.enum(Object.keys(youtubeShapes) as [YoutubeShape, ...YoutubeShape[]]),
    }))
    .handler(async ({ data }) => {
        await checkParent(data.albumId, data.parentId);
        const entryId = await db.transaction(async (tx) => {
            const [entry] = await tx.insert(albumEntries)
                .values({ albumId: data.albumId, parentId: data.parentId, position: await nextPosition(tx, data.albumId, data.parentId), type: "media" })
                .returning({ id: albumEntries.id });
            await tx.insert(albumEntryVariants).values({ entryId: entry.id, variant: "video", youtubeId: data.youtubeId, ...youtubeShapes[data.shape] });
            return entry.id;
        });
        await publishAlbum(data.albumId);
        return { entryId };
    });

/** Sets the album's cover to one of its media, or back to its first one with null. */
export const setAlbumCover = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ albumId: z.uuid(), entryId: z.uuid().nullable() }))
    .handler(async ({ data }) => {
        await db.update(albums).set({ coverEntryId: data.entryId }).where(eq(albums.id, data.albumId));
        await publishAlbum(data.albumId);
    });

/** Remakes a photo's sizes from its original in the background, only the chosen ones; the others are deleted. */
export const changeAlbumEntryVariants = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ albumId: z.uuid(), entryId: z.uuid(), sizes: imageSizeList }))
    .handler(async ({ data }) => {
        await start(reprocessAlbumEntry, [data.albumId, data.entryId, data.sizes]);
    });
