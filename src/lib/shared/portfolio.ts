/** What the portfolio's server and admin both need: its files' urls, video shapes, and reading YouTube links. */
import { imageSizeNames, variantFile } from "./images";
import { publicUrl } from "./s3";
import type { ImageSize, StoredVariant } from "./images";

/** A portfolio upload starts with every size: the gallery's viewer uses the biggest on large screens. */
export const portfolioDefaultSizes: ImageSize[] = imageSizeNames;

/** What a YouTube video's tile is shaped like: a normal video, or a short. */
export const youtubeShapes = {
    landscape: { width: 1920, height: 1080 },
    portrait: { width: 1080, height: 1920 },
} as const;

export type YoutubeShape = keyof typeof youtubeShapes;

/** The id in a YouTube link (watch, youtu.be, shorts, embed) or the id itself; null when it's neither. */
export function youtubeId(input: string) {
    const text = input.trim();
    if (/^[\w-]{11}$/.test(text)) return text;

    try {
        const url = new URL(text);
        const host = url.hostname.replace(/^(www|m)\./, "");
        const id = host === "youtu.be"
            ? url.pathname.slice(1)
            : url.searchParams.get("v") ?? url.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]+)/)?.[1];
        return id && /^[\w-]{11}$/.test(id) && (host === "youtu.be" || host.endsWith("youtube.com")) ? id : null;
    } catch {
        return null;
    }
}

export type PortfolioVariant = StoredVariant;

/** A variant's url: its file in the portfolio bucket, or for a video, YouTube's thumbnail. */
export function portfolioVariantUrl(mediaId: string, variant: PortfolioVariant) {
    return variant.youtubeId
        ? `https://i.ytimg.com/vi/${variant.youtubeId}/hqdefault.jpg`
        : publicUrl("portfolio", variantFile(mediaId, variant.variant, variant.contentType ?? ""));
}
