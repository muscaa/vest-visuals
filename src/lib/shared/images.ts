/**
 * The sizes every stored image (assets, portfolio, albums) can be made in, and where its files go. Pages list the
 * sizes in `srcSet` and the browser picks the smallest one sharp enough for the screen, so they only need to be spread
 * from a phone's gallery tile to a 4K screen's viewer.
 */
import { z } from "zod";

/** Each size's width in px; the height follows the image's shape, and smaller originals are never enlarged. */
export const imageSizes = {
    small: 480,
    medium: 960,
    large: 1600,
    xlarge: 2560,
} as const;

export type ImageSize = keyof typeof imageSizes;

export const imageSizeNames = Object.keys(imageSizes) as ImageSize[];

/** WebP quality of every size: no visible loss for photos, at about half the file of 90. */
export const imageQuality = 80;

/** A list of sizes to make, each once; the original is always kept, so it's not one of them. */
export const imageSizeList = z.array(z.enum(imageSizeNames as [ImageSize, ...ImageSize[]]))
    .refine((sizes) => new Set(sizes).size === sizes.length, "Each size only once");

/** The extension of each type stored, photos and the video files kept for downloading. */
export const extensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/webm": "webm",
};

/**
 * Where a variant of an image is stored in its bucket, in the image's folder (an asset's key, a media's id), with the
 * extension of its type: the original keeps its own (`media-hero/original.jpg`), the sizes are WebP. A string, as
 * stored variants can be sizes the code no longer has.
 */
export function variantFile(folder: string, variant: string, contentType: string) {
    return `${folder}/${variant}.${extensions[contentType] ?? "bin"}`;
}

/** A stored variant as pages need it: a file (its type set), or for a video, its YouTube id. */
export interface StoredVariant {
    variant: string;
    contentType: string | null;
    youtubeId: string | null;
    width: number;
    height: number;
}
