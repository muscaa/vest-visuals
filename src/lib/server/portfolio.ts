/** What the portfolio's server functions and workflows share: adding in order, and deleting media with their files. */
import { and, count, eq, inArray, max, notExists } from "drizzle-orm";
import { db } from "@server/db";
import { portfolioCategoryGroups, portfolioGroupMedia, portfolioMedia } from "@server/db/schema";
import { publish } from "@server/events";
import { deletePrefix } from "@server/s3";
import { youtubeItem } from "@shared/gallery";
import { portfolioVariantUrl } from "@shared/portfolio";
import type { GalleryItem } from "@shared/gallery";
import type { PortfolioVariant } from "@shared/portfolio";

type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

/** Adds groups at the end of a category, skipping the ones already in it. */
export async function appendGroups(tx: Transaction, categoryKey: string, groupIds: string[]) {
    const [{ last }] = await tx.select({ last: max(portfolioCategoryGroups.position) })
        .from(portfolioCategoryGroups)
        .where(eq(portfolioCategoryGroups.categoryKey, categoryKey));
    if (!groupIds.length) return;

    await tx.insert(portfolioCategoryGroups)
        .values(groupIds.map((groupId, index) => ({ categoryKey, groupId, position: (last ?? -1) + 1 + index })))
        .onConflictDoNothing();
}

/** Adds media at the end of a group, skipping the ones already in it. */
export async function appendMedia(tx: Transaction, groupId: string, mediaIds: string[]) {
    const [{ last }] = await tx.select({ last: max(portfolioGroupMedia.position) })
        .from(portfolioGroupMedia)
        .where(eq(portfolioGroupMedia.groupId, groupId));
    if (!mediaIds.length) return;

    await tx.insert(portfolioGroupMedia)
        .values(mediaIds.map((mediaId, index) => ({ groupId, mediaId, position: (last ?? -1) + 1 + index })))
        .onConflictDoNothing();
}

/** Deletes media everywhere: their files, then their rows (which takes their variants and places with them). */
export async function deleteMedia(ids: string[]) {
    if (!ids.length) return;

    for (const id of ids) await deletePrefix("portfolio", `${id}/`);
    await db.delete(portfolioMedia).where(inArray(portfolioMedia.id, ids));
    await publish("portfolio", {});
}

/** Of these media, deletes the ones no group holds anymore, e.g. after their only group was deleted. */
export async function deleteOrphanMedia(ids: string[]) {
    if (!ids.length) return;

    const orphans = await db.select({ id: portfolioMedia.id })
        .from(portfolioMedia)
        .where(and(
            inArray(portfolioMedia.id, ids),
            notExists(db.select().from(portfolioGroupMedia).where(eq(portfolioGroupMedia.mediaId, portfolioMedia.id))),
        ));
    await deleteMedia(orphans.map((orphan) => orphan.id));
}

//
// shapes sent to the admin and the gallery
//

/** A variant as the admin and the gallery need it. */
function variantOf(row: PortfolioVariant): PortfolioVariant {
    return { variant: row.variant, contentType: row.contentType, youtubeId: row.youtubeId, width: row.width, height: row.height };
}

/** A media for the admin: its variants (none while it's processing) and in how many groups it is. */
export function adminMedia(row: { id: string; createdAt: Date; updatedAt: Date; variants: PortfolioVariant[]; groups?: unknown[] }) {
    return {
        id: row.id,
        variants: row.variants.map(variantOf),
        groupCount: row.groups?.length ?? 0,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}

export type AdminPortfolioMedia = ReturnType<typeof adminMedia>;

/** A group for the admin, its cover being its first media. */
export function adminGroup(
    row: {
        id: string;
        location: string | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        categories: { categoryKey: string }[];
        media: { media: { id: string; variants: PortfolioVariant[] } }[];
    },
    mediaCounts: Map<string, number>,
) {
    const cover = row.media[0]?.media;
    return {
        id: row.id,
        location: row.location,
        description: row.description,
        categories: row.categories.map((category) => category.categoryKey),
        mediaCount: mediaCounts.get(row.id) ?? 0,
        cover: cover ? { id: cover.id, variants: cover.variants.map(variantOf) } : null,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}

export type AdminPortfolioGroup = ReturnType<typeof adminGroup>;

/** How many media each group holds, by group id. */
export async function groupMediaCounts() {
    const rows = await db.select({ groupId: portfolioGroupMedia.groupId, count: count() })
        .from(portfolioGroupMedia)
        .groupBy(portfolioGroupMedia.groupId);
    return new Map(rows.map((row) => [row.groupId, row.count]));
}

/**
 * A media as the gallery shows it: a photo in all its sizes, smallest first, its shape from its original; a video from
 * YouTube. Null while it's still processing.
 */
export function galleryItem(id: string, variants: PortfolioVariant[]): GalleryItem | null {
    const video = variants.find((variant) => variant.youtubeId);
    if (video?.youtubeId) {
        return { ...youtubeItem(video.youtubeId, { width: video.width, height: video.height }), id };
    }

    const original = variants.find((variant) => variant.variant === "original");
    if (!original) return null;

    // the original only when there's no size, as it can be huge
    const sizes = variants.filter((variant) => variant !== original);
    return {
        id,
        width: original.width,
        height: original.height,
        images: (sizes.length ? sizes : [original])
            .toSorted((a, b) => a.width - b.width)
            .map((variant) => ({ url: portfolioVariantUrl(id, variant), width: variant.width })),
    };
}
