/** The steps saving an asset's variants; making them is in `../images/steps`. */
import { and, eq } from "drizzle-orm";
import { FatalError } from "workflow";
import { db } from "@server/db";
import { assets } from "@server/db/schema";
import { publish } from "@server/events";
import { deleteObjects } from "@server/s3";
import { variantFile } from "@shared/images";
import { staleFiles } from "../images/steps";
import type { ImageSource, ImageVariant } from "../images/steps";

/** An asset's stored original, to make its sizes from again; one without can't be, so it's not retried. */
export async function findAssetOriginal(key: string) {
    "use step";

    const [original] = await db.select().from(assets).where(and(eq(assets.key, key), eq(assets.variant, "original")));
    if (!original) {
        throw new FatalError(`The asset ${key} has no original`);
    }

    const variant: ImageVariant = { variant: "original", contentType: original.contentType, width: original.width, height: original.height };
    const source: ImageSource = { bucket: "assets", key: variantFile(key, "original", original.contentType) };
    return { variant, source };
}

/**
 * Saves the asset's variants, which makes it ready, or replaced. Whatever it had before and no longer does is deleted
 * with its file: sizes not chosen anymore, ones renamed in the code since, an original of another type.
 */
export async function saveAssetVariants(key: string, variants: ImageVariant[]) {
    "use step";

    const before = await db.transaction(async (tx) => {
        const rows = await tx.select().from(assets).where(eq(assets.key, key));
        await tx.delete(assets).where(eq(assets.key, key));
        // kept ones keep when they were first made
        await tx.insert(assets).values(variants.map((variant) => ({
            key,
            ...variant,
            createdAt: rows.find((row) => row.variant === variant.variant)?.createdAt,
        })));
        return rows;
    });

    await deleteObjects("assets", staleFiles(key, before, variants));
    await publish("assets", { key });
}
