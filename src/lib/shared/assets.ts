/**
 * The site's own images (heroes, covers, team photos), by name. Each is uploaded under its key and resized to every
 * size, so a missing one is found by its key here. One not listed yet works with a cast (`"new-key" as AssetKey`).
 */
import { z } from "zod";
import { publicUrl } from "./s3";

export const assetKeys = [
    "media-hero",
    "media-about-team",
    "portfolio-wedding-cover",
] as const;

export type AssetKey = (typeof assetKeys)[number];

/** Each size by its shorter side, in px, and its WebP quality. Smaller originals are never enlarged. */
export const assetSizes = {
    small: { short: 360, quality: 70 },
    medium: { short: 768, quality: 80 },
    large: { short: 1080, quality: 90 },
} as const;

export type AssetSize = keyof typeof assetSizes;

export const assetSizeNames = Object.keys(assetSizes) as AssetSize[];

/** A list of sizes to make, each once; the original is always kept, so it's not one of them. */
export const assetSizeList = z.array(z.enum(assetSizeNames as [AssetSize, ...AssetSize[]]))
    .refine((sizes) => new Set(sizes).size === sizes.length, "Each size only once");

/** An asset's url in one size: `asset("portfolio-wedding-cover", "large")`. */
export function asset(key: AssetKey, size: AssetSize) {
    return publicUrl("assets", assetFile(key, size, "image/webp"));
}

const extensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};

/**
 * Where a variant of an asset is stored in the assets bucket, its extension from its content type: the original keeps
 * its own (`media-hero/original.jpg`), the sizes are WebP. A string, as stored variants can be sizes the code no longer
 * has.
 */
export function assetFile(key: string, variant: string, contentType: string) {
    return `${key}/${variant}.${extensions[contentType] ?? "bin"}`;
}
