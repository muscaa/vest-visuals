/**
 * The site's own images (heroes, covers, team photos), by name. Each is uploaded under its key and resized to every
 * size, so a missing one is found by its key here. One not listed yet works with a cast (`"new-key" as AssetKey`).
 */
import { publicUrl } from "./s3";

export const assetKeys = [
    "media-hero",
    "media-about-team",
    "portfolio-wedding-cover",
] as const;

export type AssetKey = (typeof assetKeys)[number];

export const assetSizes = ["small", "medium", "large"] as const;

export type AssetSize = (typeof assetSizes)[number];

/** An asset's url in one size: `asset("portfolio-wedding-cover", "large")`. */
export function asset(key: AssetKey, size: AssetSize) {
    return publicUrl("assets", `${key}/${size}.webp`);
}
