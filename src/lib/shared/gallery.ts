/** A photo or video in a gallery (portfolio, albums), as the server sends it. */
export interface GalleryItem {
    id: string;
    /** the full size, for the aspect ratio; the files can be smaller */
    width: number;
    height: number;
    /** the photo in several widths, smallest first, for `srcSet`; for videos, the YouTube thumbnails */
    images: { url: string; width: number }[];
    /** only for videos: they play from YouTube, and the file in storage is for downloading */
    video?: { youtube: string; download?: string };
    alt?: string;
}

/** One page of an endless gallery. */
export interface GalleryPage {
    items: GalleryItem[];
    /** what to pass for the next page, null after the last one */
    nextCursor: number | null;
}

/** The `srcSet` attribute of an item's images. */
export function gallerySrcSet(item: GalleryItem) {
    return item.images.map((image) => `${image.url} ${image.width}w`).join(", ");
}

/**
 * A YouTube video as a gallery item, 16:9 unless told otherwise. Its thumbnails are 4:3 with black bars above and
 * below, which the 16:9 tiles crop away.
 */
export function youtubeItem(youtube: string, options: { download?: string; width?: number; height?: number } = {}): GalleryItem {
    return {
        id: `youtube-${youtube}`,
        width: options.width ?? 1920,
        height: options.height ?? 1080,
        images: [
            { url: `https://i.ytimg.com/vi/${youtube}/mqdefault.jpg`, width: 320 },
            { url: `https://i.ytimg.com/vi/${youtube}/hqdefault.jpg`, width: 480 },
            { url: `https://i.ytimg.com/vi/${youtube}/sddefault.jpg`, width: 640 },
        ],
        video: { youtube, download: options.download },
    };
}

/** What the viewer's download button saves: the video's file, or the largest photo. */
export function galleryDownload(item: GalleryItem) {
    // TODO: the original file from storage, with a link that makes the browser save it (Content-Disposition)
    return item.video ? item.video.download : item.images.at(-1)?.url;
}
