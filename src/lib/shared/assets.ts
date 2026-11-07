/**
 * The site's own images (heroes, covers, team photos), by name. Each is uploaded under its key and resized to every
 * size, so a missing one is found by its key here. One not listed yet works with a cast (`"new-key" as AssetKey`).
 */
import { variantFile } from "./images";
import { publicUrl } from "./s3";
import type { ImageSize } from "./images";

export const assetKeys = [
    // home: the media division's tile
    "home-media-tile",

    // media home: the hero's carousel, then each section's photos
    "media-hero-1",
    "media-hero-2",
    "media-hero-3",
    "media-hero-4",
    "media-hero-5",
    "media-editing-before",
    "media-editing-after",
    "media-team-mihail",
    "media-team-david",
    "media-portfolio-wedding",
    "media-portfolio-christening",
    "media-portfolio-18th-birthday",
    "media-portfolio-photo-session",
    "media-portfolio-automotive",
    "media-portfolio-real-estate",
    "media-portfolio-business-promotion",

    // media services: each page's hero carousel; the first is also the service's cover on cards
    "media-service-wedding-1",
    "media-service-wedding-2",
    "media-service-wedding-3",
    "media-service-wedding-4",
    "media-service-wedding-5",
    "media-service-christening-1",
    "media-service-christening-2",
    "media-service-christening-3",
    "media-service-christening-4",
    "media-service-christening-5",
    "media-service-18th-birthday-1",
    "media-service-18th-birthday-2",
    "media-service-18th-birthday-3",
    "media-service-18th-birthday-4",
    "media-service-18th-birthday-5",
    "media-service-18th-birthday-6",
    "media-service-18th-birthday-7",
    "media-service-photo-session-1",
    "media-service-photo-session-2",
    "media-service-photo-session-3",
    "media-service-photo-session-4",
    "media-service-photo-session-5",
    "media-service-photo-session-6",
    "media-service-photo-session-7",
    "media-service-real-estate-1",
    "media-service-real-estate-2",
    "media-service-real-estate-3",
    "media-service-automotive-1",
    "media-service-automotive-2",
    "media-service-automotive-3",
    "media-service-automotive-4",
    "media-service-automotive-5",
    "media-service-automotive-6",
    "media-service-business-promotion-1",
    "media-service-business-promotion-2",
    "media-service-business-promotion-3",
    "media-service-business-promotion-4",
    "media-service-business-promotion-5",

    // media locations: each city's photo, on its page and its cards
    "media-location-timisoara",
    "media-location-arad",
    "media-location-oradea",
    "media-location-drobeta-turnu-severin",
    "media-location-cluj-napoca",
    "media-location-bucuresti",

    // software: the portfolio's screenshots
    "software-portfolio-aerionic",
] as const;

export type AssetKey = (typeof assetKeys)[number];

/** The sizes an asset upload starts with; the biggest is mostly for full-screen galleries. */
export const assetDefaultSizes: ImageSize[] = ["small", "medium", "large"];

/** An asset's url in one size: `asset("portfolio-wedding-cover", "large")`. */
export function asset(key: AssetKey, size: ImageSize) {
    return publicUrl("assets", variantFile(key, size, "image/webp"));
}
