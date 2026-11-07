/** Clients' albums, as their link opens them, and as their owners see them in their account. */
import { auth } from "@server/auth";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { and, desc, eq, gt, isNull, or } from "drizzle-orm";
import { z } from "zod";
import { randomToken } from "@server/db/schema/columns";
import {
    albumCover,
    albumGalleryItem,
    archiveEntries,
    directoryPreviews,
    findDirectory,
    findOpenAlbum,
    listEntries,
    publishAlbum,
} from "@server/albums";
import { db } from "@server/db";
import { albums } from "@server/db/schema";
import { compareArchive } from "@shared/albums";
import { isAdmin } from "@shared/auth";
import { publicUrl } from "@shared/s3";
import { sessionMiddleware } from "./auth";
import type { PublicAlbum } from "@shared/albums";
import type { GalleryItem, GalleryPage } from "@shared/gallery";

const pageSize = 30;

/** Whether the request comes from an admin, who opens drafts and locked albums too. */
async function requestedByAdmin() {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });
    return isAdmin(session?.user);
}

/** The album a link opens and the directory at its path; "not found" when either doesn't exist, or the album can't be opened. */
async function openDirectory(token: string, path: string[]) {
    const album = await findOpenAlbum(token, await requestedByAdmin());
    const directory = album && await findDirectory(album.id, path);
    if (!album || !directory) {
        throw notFound();
    }
    return { album, directory };
}

const location = z.object({ token: z.string(), path: z.array(z.string()) });

/** An album at one of its directories (or its root): its details, where it is, its subdirectories, its zip. */
export const getAlbum = createServerFn({ method: "GET" })
    .validator(location)
    .handler(async ({ data }): Promise<PublicAlbum> => {
        const { album, directory } = await openDirectory(data.token, data.path);

        const directories = (await listEntries(album.id, directory.id)).filter((entry) => entry.type === "directory");
        const previews = await directoryPreviews(directories.map((entry) => entry.id));
        const synced = album.archive && compareArchive(album.archive, await archiveEntries(album.id)).state === "synced";

        return {
            id: album.id,
            token: album.token,
            title: album.title,
            description: album.description ?? undefined,
            date: album.date,
            cover: await albumCover(album),
            draft: album.status === "draft",
            path: directory.path,
            directories: directories.map((entry) => ({ id: entry.id, name: entry.name!, slug: entry.slug!, previews: previews.get(entry.id) ?? [] })),
            archiveUrl: synced && album.archive ? publicUrl("albums", album.archive.key) : null,
        };
    });

/** A page of a directory's photos and videos, in their order; ones still processing aren't shown yet. */
export const getAlbumPage = createServerFn({ method: "GET" })
    .validator(location.extend({ cursor: z.number().int().min(0) }))
    .handler(async ({ data }): Promise<GalleryPage> => {
        const { album, directory } = await openDirectory(data.token, data.path);

        const media = (await listEntries(album.id, directory.id)).filter((entry) => entry.type === "media");
        const items = media.slice(data.cursor, data.cursor + pageSize)
            .map(albumGalleryItem)
            .filter((item): item is GalleryItem => item !== null);

        const next = data.cursor + pageSize;
        return { items, nextCursor: next < media.length ? next : null };
    });

export const albumQuery = (token: string, path: string[]) => queryOptions({
    queryKey: ["albums", token, ...path],
    queryFn: () => getAlbum({ data: { token, path } }),
});

export const albumMediaQuery = (token: string, path: string[]) => infiniteQueryOptions({
    queryKey: ["albums", token, ...path, "media"],
    queryFn: ({ pageParam }) => getAlbumPage({ data: { token, path, cursor: pageParam } }),
    initialPageParam: 0,
    getNextPageParam: (page) => page.nextCursor,
});

//
// the client's own
//

/** The signed in client's published albums, by their email, until they lock; the newest first. */
export const listMyAlbums = createServerFn({ method: "GET" })
    .middleware([sessionMiddleware])
    .handler(async ({ context }) => {
        const mine = await db.select()
            .from(albums)
            .where(and(
                eq(albums.email, context.user.email),
                eq(albums.status, "published"),
                or(isNull(albums.lockAt), gt(albums.lockAt, new Date())),
            ))
            .orderBy(desc(albums.date));

        return await Promise.all(mine.map(async (album) => ({
            id: album.id,
            token: album.token,
            title: album.title,
            date: album.date,
            lockAt: album.lockAt,
            cover: await albumCover(album),
        })));
    });

export type MyAlbum = Awaited<ReturnType<typeof listMyAlbums>>[number];

export const myAlbumsQuery = queryOptions({
    queryKey: ["account", "albums"],
    queryFn: () => listMyAlbums(),
});

/**
 * Gives an album a new link, the old one stops working: for its client, from their account, or an admin. Files someone
 * already opened keep their own links until the album is deleted.
 */
export const renewAlbumLink = createServerFn({ method: "POST" })
    .middleware([sessionMiddleware])
    .validator(z.object({ id: z.uuid() }))
    .handler(async ({ data, context }) => {
        const [album] = await db.select({ email: albums.email }).from(albums).where(eq(albums.id, data.id));
        if (!album || (!isAdmin(context.user) && album.email !== context.user.email)) {
            throw new Error("Not allowed to change this album's link");
        }

        const [updated] = await db.update(albums).set({ token: randomToken() }).where(eq(albums.id, data.id)).returning({ token: albums.token });
        await publishAlbum(data.id);
        return { token: updated.token };
    });
