/** The steps saving a portfolio photo's variants; making them is in `../images/steps`. */
import { and, eq } from "drizzle-orm";
import { FatalError } from "workflow";
import { db } from "@server/db";
import { portfolioGroups, portfolioMedia, portfolioMediaVariants } from "@server/db/schema";
import { publish } from "@server/events";
import { appendMedia, deleteMedia } from "@server/portfolio";
import { deleteObjects } from "@server/s3";
import { variantFile } from "@shared/images";
import { staleFiles } from "../images/steps";
import type { ImageSource, ImageVariant } from "../images/steps";

/**
 * A new media at the end of the group, without variants yet: it shows as processing until they're saved. One whose
 * group is gone can't be added, so it's not retried.
 */
export async function createPortfolioMedia(groupId: string) {
    "use step";

    const id = await db.transaction(async (tx) => {
        const [group] = await tx.select({ id: portfolioGroups.id }).from(portfolioGroups).where(eq(portfolioGroups.id, groupId));
        if (!group) return null;

        const [media] = await tx.insert(portfolioMedia).values({}).returning({ id: portfolioMedia.id });
        await appendMedia(tx, groupId, [media.id]);
        return media.id;
    });
    if (!id) {
        throw new FatalError(`There's no portfolio group ${groupId}`);
    }

    await publish("portfolio", {});
    return id;
}

/** A media's stored original, to make its sizes from again; one without (a video) can't be, so it's not retried. */
export async function findPortfolioOriginal(mediaId: string) {
    "use step";

    const [original] = await db.select()
        .from(portfolioMediaVariants)
        .where(and(eq(portfolioMediaVariants.mediaId, mediaId), eq(portfolioMediaVariants.variant, "original")));
    if (!original?.contentType) {
        throw new FatalError(`The portfolio media ${mediaId} has no original`);
    }

    const variant: ImageVariant = { variant: "original", contentType: original.contentType, width: original.width, height: original.height };
    const source: ImageSource = { bucket: "portfolio", key: variantFile(mediaId, "original", original.contentType) };
    return { variant, source };
}

/** Saves a photo's variants, which makes it show; the ones it had before and no longer does are deleted with their files. */
export async function savePortfolioVariants(mediaId: string, variants: ImageVariant[]) {
    "use step";

    const before = await db.transaction(async (tx) => {
        const rows = await tx.select().from(portfolioMediaVariants).where(eq(portfolioMediaVariants.mediaId, mediaId));
        await tx.delete(portfolioMediaVariants).where(eq(portfolioMediaVariants.mediaId, mediaId));
        await tx.insert(portfolioMediaVariants).values(variants.map((variant) => ({
            mediaId,
            ...variant,
            createdAt: rows.find((row) => row.variant === variant.variant)?.createdAt,
        })));
        await tx.update(portfolioMedia).set({ updatedAt: new Date() }).where(eq(portfolioMedia.id, mediaId));
        return rows;
    });

    const files = before.filter((row): row is typeof row & { contentType: string } => row.contentType !== null);
    await deleteObjects("portfolio", staleFiles(mediaId, files, variants));
    await publish("portfolio", {});
}

/** A media whose processing failed, so it doesn't stay in its group without anything to show. */
export async function removePortfolioMedia(mediaId: string) {
    "use step";

    await deleteMedia([mediaId]);
}
