/**
 * Clients' albums: a tree of directories and media (photos, and videos playing from YouTube with their file kept for
 * downloading), opened by a link with the album's token. What the server, the admin and the album's pages share.
 */
import { imageSizeNames, variantFile } from "./images";
import { publicUrl } from "./s3";
import type { GalleryItem } from "./gallery";
import type { ImageSize, StoredVariant } from "./images";

/** An album upload starts with every size: the viewer uses the biggest on large screens. */
export const albumDefaultSizes: ImageSize[] = imageSizeNames;

/** The video files an album takes for downloading, next to its YouTube link. */
export const albumVideoTypes = ["video/mp4", "video/quicktime", "video/webm"];

/** A directory's name in urls: lowercase, Romanian letters made plain, anything else a hyphen ("Dans și tort" → "dans-si-tort"). */
export function slugify(name: string) {
    const slug = name
        .normalize("NFD")
        // the accents, commas and breves split off the letters above
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return slug || "director";
}

const day = 24 * 60 * 60 * 1000;

/** When a published album locks and is deleted, unless chosen otherwise: a year after publishing, then 30 days later. */
export function albumDatePresets(from = new Date()) {
    const lockAt = new Date(from);
    lockAt.setFullYear(lockAt.getFullYear() + 1);
    return { lockAt, deleteAt: new Date(lockAt.getTime() + 30 * day) };
}

/** A variant's url: its file in the albums bucket, or for a video, YouTube's thumbnail. */
export function albumVariantUrl(entryId: string, variant: StoredVariant) {
    return variant.youtubeId
        ? `https://i.ytimg.com/vi/${variant.youtubeId}/hqdefault.jpg`
        : publicUrl("albums", variantFile(entryId, variant.variant, variant.contentType ?? ""));
}

//
// the album's pages
//

export interface PublicDirectory {
    id: string;
    name: string;
    slug: string;
    /** up to 3 photos or videos from inside it, the first on top of the fan */
    previews: GalleryItem[];
}

/** A client's album, at one of its directories (or its root), as the page shows it; the media come a page at a time. */
export interface PublicAlbum {
    id: string;
    token: string;
    title: string;
    description?: string;
    /** ISO date of the event */
    date: string;
    /** null while the album has no photo */
    cover: GalleryItem | null;
    /** only admins open drafts, to see them as the client will */
    draft: boolean;
    /** the directories from the album's root down to this one, empty at the root */
    path: { name: string; slug: string }[];
    directories: PublicDirectory[];
    /** the whole album as a zip, while it's in sync with the album */
    archiveUrl: string | null;
}

//
// the whole album's zip
//

/** One file in the zip, as it was when the zip was built. */
export interface AlbumArchiveEntry {
    entryId: string;
    /** in the zip, under the album's directories: "Ceremonie/IMG_1234.jpg" */
    path: string;
    /** when the file last changed */
    updatedAt: string;
}

/** The last zip built for an album, and what's in it, to compare with the album now. */
export interface AlbumArchive {
    /** in the albums bucket */
    key: string;
    builtAt: string;
    size: number;
    entries: AlbumArchiveEntry[];
}

/** How the zip compares to the album: missing, the same, or with files added, removed or changed since. */
export interface AlbumArchiveState {
    state: "none" | "synced" | "stale";
    added: number;
    removed: number;
    changed: number;
}

export function compareArchive(archive: AlbumArchive | null, current: AlbumArchiveEntry[]): AlbumArchiveState {
    if (!archive) {
        return { state: current.length ? "none" : "synced", added: current.length, removed: 0, changed: 0 };
    }

    const before = new Map(archive.entries.map((entry) => [entry.entryId, entry]));
    const now = new Map(current.map((entry) => [entry.entryId, entry]));
    const added = current.filter((entry) => !before.has(entry.entryId)).length;
    const removed = archive.entries.filter((entry) => !now.has(entry.entryId)).length;
    const changed = current.filter((entry) => {
        const old = before.get(entry.entryId);
        return old && (old.path !== entry.path || old.updatedAt !== entry.updatedAt);
    }).length;

    return { state: added || removed || changed ? "stale" : "synced", added, removed, changed };
}
