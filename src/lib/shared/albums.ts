import type { GalleryItem } from "./gallery";

/**
 * A client's album, as anyone with its link sees it. The photos and videos come separately, a page at a time.
 * When it locks and gets deleted is only for the admin and the client, never sent here.
 */
export interface PublicAlbum {
    id: string;
    title: string;
    description?: string;
    /** ISO date of the event */
    date: string;
    cover: GalleryItem;
}
