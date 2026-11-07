/** What the albums' server functions and workflows share: finding albums and directories, the tree, files, the zip. */
import { and, eq, inArray, isNull, max, sql } from "drizzle-orm";
import { db } from "@server/db";
import { albumEntries, albumEntryVariants, albums } from "@server/db/schema";
import { publish } from "@server/events";
import { deleteObjects, deletePrefix } from "@server/s3";
import { albumVariantUrl, slugify } from "@shared/albums";
import { youtubeItem } from "@shared/gallery";
import { extensions, variantFile } from "@shared/images";
import { publicUrl } from "@shared/s3";
import type { AlbumArchiveEntry } from "@shared/albums";
import type { GalleryItem } from "@shared/gallery";
import type { StoredVariant } from "@shared/images";

type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

/** Tells the album's admin page, and other admins' open pages, that it changed. */
export function publishAlbum(albumId: string) {
    return publish("albums", { albumId });
}

/** Where a directory's entries are: in it, or at the album's root. */
function inParent(albumId: string, parentId: string | null) {
    return and(eq(albumEntries.albumId, albumId), parentId ? eq(albumEntries.parentId, parentId) : isNull(albumEntries.parentId));
}

/**
 * The album a link opens, or null as if it didn't exist: a published one before it locks, or any one for admins, who
 * open drafts and locked ones to see them as the client does.
 */
export async function findOpenAlbum(token: string, admin: boolean) {
    const album = await db.query.albums.findFirst({ where: eq(albums.token, token) });
    if (!album) return null;
    if (admin) return album;

    const locked = album.lockAt && album.lockAt <= new Date();
    return album.status === "published" && !locked ? album : null;
}

/**
 * The directory at a path of slugs (`["ceremonie", "dans"]`), followed one level at a time, with the names on the way;
 * null when one of them doesn't exist. An empty path is the album's root.
 */
export async function findDirectory(albumId: string, slugs: string[]) {
    let parentId: string | null = null;
    const path: { name: string; slug: string }[] = [];

    for (const slug of slugs) {
        const [directory] = await db.select({ id: albumEntries.id, name: albumEntries.name, slug: albumEntries.slug })
            .from(albumEntries)
            .where(and(inParent(albumId, parentId), eq(albumEntries.type, "directory"), eq(albumEntries.slug, slug)));
        if (!directory?.name || !directory.slug) return null;

        parentId = directory.id;
        path.push({ name: directory.name, slug: directory.slug });
    }
    return { id: parentId, path };
}

/** A directory's entries (or the root's), in order, with their variants. */
export function listEntries(albumId: string, parentId: string | null) {
    return db.query.albumEntries.findMany({
        where: inParent(albumId, parentId),
        orderBy: (entry, { asc }) => [asc(entry.position)],
        with: { variants: true },
    });
}

/** The position after a directory's last entry. */
export async function nextPosition(tx: Transaction, albumId: string, parentId: string | null) {
    const [{ last }] = await tx.select({ last: max(albumEntries.position) }).from(albumEntries).where(inParent(albumId, parentId));
    return (last ?? -1) + 1;
}

/** A slug for a directory's name that no other directory next to it has: "dans", else "dans-2", "dans-3"… */
export async function uniqueSlug(tx: Transaction, albumId: string, parentId: string | null, name: string, exceptId?: string) {
    const taken = await tx.select({ id: albumEntries.id, slug: albumEntries.slug })
        .from(albumEntries)
        .where(and(inParent(albumId, parentId), eq(albumEntries.type, "directory")));
    const used = new Set(taken.filter((entry) => entry.id !== exceptId).map((entry) => entry.slug));

    const base = slugify(name);
    let slug = base;
    for (let count = 2; used.has(slug); count++) slug = `${base}-${count}`;
    return slug;
}

/** These entries and everything inside them, at any depth. */
export async function withDescendants(ids: string[]) {
    if (!ids.length) return [];

    const { rows } = await db.execute<{ id: string; type: "directory" | "media" }>(sql`
        with recursive tree as (
            select id, type from album_entries where id in ${ids}
            union all
            select child.id, child.type from album_entries child join tree on child.parent_id = tree.id
        )
        select id, type from tree
    `);
    return rows;
}

/** Deletes entries with everything inside them: the media's files first, then the rows. */
export async function deleteEntries(ids: string[]) {
    const all = await withDescendants(ids);
    for (const entry of all) {
        if (entry.type === "media") await deletePrefix("albums", `${entry.id}/`);
    }
    if (ids.length) await db.delete(albumEntries).where(inArray(albumEntries.id, ids));
}

/** Deletes an album for good: its media's files, its zip, then its rows. */
export async function deleteAlbum(albumId: string) {
    const [album] = await db.select({ archive: albums.archive }).from(albums).where(eq(albums.id, albumId));
    if (!album) return;

    const roots = await db.select({ id: albumEntries.id }).from(albumEntries).where(inParent(albumId, null));
    await deleteEntries(roots.map((root) => root.id));
    if (album.archive) await deleteObjects("albums", [album.archive.key]);
    await db.delete(albums).where(eq(albums.id, albumId));
    await publishAlbum(albumId);
}

/** The shape of a variant, as the pages need it. */
export function variantOf(row: StoredVariant): StoredVariant {
    return { variant: row.variant, contentType: row.contentType, youtubeId: row.youtubeId, width: row.width, height: row.height };
}

/**
 * A media as the album's gallery shows it: a photo in all its sizes, a video from YouTube, either one with its
 * original file to download. Null while it's processing.
 */
export function albumGalleryItem(entry: { id: string; variants: StoredVariant[] }): GalleryItem | null {
    const original = entry.variants.find((variant) => variant.variant === "original");
    const download = original?.contentType ? publicUrl("albums", variantFile(entry.id, "original", original.contentType)) : undefined;

    const video = entry.variants.find((variant) => variant.youtubeId);
    if (video?.youtubeId) {
        return { ...youtubeItem(video.youtubeId, { width: video.width, height: video.height, download }), id: entry.id };
    }
    if (!original) return null;

    // the original only when there's no size, as it can be huge
    const sizes = entry.variants.filter((variant) => variant !== original);
    return {
        id: entry.id,
        width: original.width,
        height: original.height,
        images: (sizes.length ? sizes : [original])
            .toSorted((a, b) => a.width - b.width)
            .map((variant) => ({ url: albumVariantUrl(entry.id, variant), width: variant.width })),
        download,
    };
}

/**
 * Up to 3 photos or videos from inside each directory, to show it as a fan: its own first, in order, then its
 * subdirectories', level by level.
 */
export async function directoryPreviews(directoryIds: string[]) {
    const previews = new Map<string, GalleryItem[]>(directoryIds.map((id) => [id, []]));
    if (!directoryIds.length) return previews;

    const { rows } = await db.execute<{ root: string; id: string }>(sql`
        with recursive tree as (
            select id as root, id, type, array[]::integer[] as sort from album_entries where id in ${directoryIds}
            union all
            select tree.root, child.id, child.type, tree.sort || child.position
            from album_entries child join tree on child.parent_id = tree.id
        )
        select root, id from tree where type = 'media' order by root, cardinality(sort), sort
    `);

    // a few more than 3 each, in case some are still processing
    const candidates = new Map<string, string[]>();
    for (const row of rows) {
        const list = candidates.get(row.root) ?? [];
        if (list.length < 6) candidates.set(row.root, [...list, row.id]);
    }
    const ids = [...candidates.values()].flat();
    const variants = ids.length ? await db.select().from(albumEntryVariants).where(inArray(albumEntryVariants.entryId, ids)) : [];

    for (const [root, list] of candidates) {
        const items = list
            .map((id) => albumGalleryItem({ id, variants: variants.filter((variant) => variant.entryId === id) }))
            .filter((item): item is GalleryItem => item !== null);
        previews.set(root, items.slice(0, 3));
    }
    return previews;
}

/**
 * What the album's zip should hold now: every media with a file, in display order, under its directories' names.
 * Two files with the same name in a directory are told apart: "IMG_1.jpg", "IMG_1 (2).jpg".
 */
export async function archiveEntries(albumId: string): Promise<(AlbumArchiveEntry & { contentType: string })[]> {
    const { rows } = await db.execute<{ id: string; dirs: string[]; filename: string | null; content_type: string; updated_at: Date | string }>(sql`
        with recursive tree as (
            select id, type, name, filename, array[]::text[] as dirs, array[position] as sort
            from album_entries where album_id = ${albumId} and parent_id is null
            union all
            select child.id, child.type, child.name, child.filename, tree.dirs || tree.name, tree.sort || child.position
            from album_entries child join tree on child.parent_id = tree.id
            where tree.type = 'directory'
        )
        select tree.id, tree.dirs, tree.filename, variant.content_type, variant.updated_at
        from tree join album_entry_variants variant on variant.entry_id = tree.id and variant.variant = 'original'
        where tree.type = 'media'
        order by tree.sort
    `);

    const used = new Set<string>();
    return rows.map((row) => {
        // a slash in a name would make another folder in the zip
        const folder = row.dirs.map((dir) => dir.replaceAll("/", "-"));
        const name = (row.filename ?? `${row.id}.${extensions[row.content_type] ?? "bin"}`).replaceAll("/", "-");
        const dot = name.lastIndexOf(".");
        const [stem, extension] = dot > 0 ? [name.slice(0, dot), name.slice(dot)] : [name, ""];

        let path = [...folder, name].join("/");
        for (let count = 2; used.has(path); count++) path = [...folder, `${stem} (${count})${extension}`].join("/");
        used.add(path);

        return { entryId: row.id, path, updatedAt: new Date(row.updated_at).toISOString(), contentType: row.content_type };
    });
}

/** The album's cover: the media chosen for it, else its first photo or video, anywhere in it; null while it has none. */
export async function albumCover(album: { id: string; coverEntryId: string | null }) {
    let entryId = album.coverEntryId;
    if (!entryId) {
        const { rows } = await db.execute<{ id: string }>(sql`
            with recursive tree as (
                select id, type, array[position] as sort from album_entries where album_id = ${album.id} and parent_id is null
                union all
                select child.id, child.type, tree.sort || child.position from album_entries child join tree on child.parent_id = tree.id
            )
            select tree.id from tree
            where tree.type = 'media' and exists (select from album_entry_variants variant where variant.entry_id = tree.id)
            order by cardinality(tree.sort), tree.sort
            limit 1
        `);
        entryId = rows[0]?.id ?? null;
    }
    if (!entryId) return null;

    const variants = await db.select().from(albumEntryVariants).where(eq(albumEntryVariants.entryId, entryId));
    return albumGalleryItem({ id: entryId, variants });
}

/** The directories from the album's root down to this one, for the admin's breadcrumb. */
export async function directoryAncestors(directoryId: string) {
    const { rows } = await db.execute<{ id: string; name: string; depth: number }>(sql`
        with recursive up as (
            select id, parent_id, name, 0 as depth from album_entries where id = ${directoryId}
            union all
            select parent.id, parent.parent_id, parent.name, up.depth + 1 from album_entries parent join up on parent.id = up.parent_id
        )
        select id, name, depth from up order by depth desc
    `);
    return rows.map(({ id, name }) => ({ id, name }));
}

/** An entry for the admin: a directory with how many entries it holds and its fan, or a media with its variants. */
export function adminEntry(
    row: typeof albumEntries.$inferSelect & { variants: StoredVariant[] },
    extra: { childCounts: Map<string, number>; previews: Map<string, GalleryItem[]> },
) {
    return {
        id: row.id,
        type: row.type,
        name: row.name,
        slug: row.slug,
        filename: row.filename,
        variants: row.variants.map(variantOf),
        childCount: extra.childCounts.get(row.id) ?? 0,
        previews: extra.previews.get(row.id) ?? [],
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}

export type AdminAlbumEntry = ReturnType<typeof adminEntry>;
