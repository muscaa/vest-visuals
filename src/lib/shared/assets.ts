/**
 * The site's own images (heroes, covers, team photos), by name. Each is uploaded under its key and resized to every
 * size, so a missing one is found by its key here. One not listed yet works with a cast (`"new-key" as AssetKey`).
 */
import { variantFile } from "./images";
import { publicUrl } from "./s3";
import type { ImageSize } from "./images";

export const assetKeys = [
    "media-hero",
    "media-about-team",
    "portfolio-wedding-cover",
] as const;

export type AssetKey = (typeof assetKeys)[number];

/** The sizes an asset upload starts with; the biggest is mostly for full-screen galleries. */
export const assetDefaultSizes: ImageSize[] = ["small", "medium", "large"];

/** An asset's url in one size: `asset("portfolio-wedding-cover", "large")`. */
export function asset(key: AssetKey, size: ImageSize) {
    return publicUrl("assets", variantFile(key, size, "image/webp"));
}
