/** The steps making an asset's variants, from an upload or from its stored original. */
import { and, eq } from "drizzle-orm";
import sharp from "sharp";
import { FatalError } from "workflow";
import { db } from "@server/db";
import { publish } from "@server/events";
import { assets } from "@server/db/schema";
import { copyObject, deleteObjects, getObject, putObject } from "@server/s3";
import { assetFile, assetSizes } from "@shared/assets";
import type { AssetSize } from "@shared/assets";
import type { Bucket } from "@shared/s3";

/** Browsers keep a file for an hour, Cloudflare for a year; a replaced asset is purged from Cloudflare instead. */
const cacheControl = "public, max-age=3600, s-maxage=31536000";

export interface AssetVariant {
    variant: string;
    contentType: string;
    width: number;
    height: number;
}

/** Where an image is read from: an upload's file, or an asset's stored original. */
export interface ImageSource {
    bucket: Bucket;
    key: string;
}

async function readFile(source: ImageSource) {
    const file = await getObject(source.bucket, source.key);
    if (!file) {
        throw new FatalError(`${source.bucket}/${source.key} is gone`);
    }
    return file;
}

/** An image's width and height as it's shown, rotated as its EXIF says; a file that isn't an image fails here. */
export async function readImageSize(source: ImageSource) {
    "use step";

    const file = await readFile(source);
    try {
        const { autoOrient } = await sharp(file).metadata();
        return { width: autoOrient.width, height: autoOrient.height };
    } catch (error) {
        throw new FatalError(`${source.bucket}/${source.key} isn't an image that can be read: ${String(error)}`);
    }
}

/** An asset's stored original, to make its sizes from again; one without can't be, so it's not retried. */
export async function findAssetOriginal(key: string) {
    "use step";

    const [original] = await db.select().from(assets).where(and(eq(assets.key, key), eq(assets.variant, "original")));
    if (!original) {
        throw new FatalError(`The asset ${key} has no original`);
    }

    const variant: AssetVariant = { variant: "original", contentType: original.contentType, width: original.width, height: original.height };
    const source: ImageSource = { bucket: "assets", key: assetFile(key, "original", original.contentType) };
    return { variant, source };
}

/** An uploaded file becomes the asset's original, as it was uploaded, with the extension of its type. */
export async function copyAssetOriginal(uploadId: string, key: string, contentType: string) {
    "use step";

    await copyObject({ bucket: "uploads", key: uploadId }, { bucket: "assets", key: assetFile(key, "original", contentType) }, { contentType, cacheControl });
}

/** One size, as WebP; metadata like the location is left out. */
export async function makeAssetSize(source: ImageSource, key: string, size: AssetSize): Promise<AssetVariant> {
    "use step";

    const { short, quality } = assetSizes[size];
    const { data, info } = await sharp(await readFile(source))
        .rotate()
        // the shorter side becomes `short`
        .resize({ width: short, height: short, fit: "outside", withoutEnlargement: true })
        .webp({ quality })
        .toBuffer({ resolveWithObject: true });

    const contentType = "image/webp";
    await putObject("assets", assetFile(key, size, contentType), data, { contentType, cacheControl });
    return { variant: size, contentType, width: info.width, height: info.height };
}

/**
 * Saves the asset's variants, which makes it ready, or replaced. Whatever it had before and no longer does is deleted
 * with its file: sizes not chosen anymore, ones renamed in the code since, an original of another type.
 */
export async function saveAssetVariants(key: string, variants: AssetVariant[]) {
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

    const files = new Set(variants.map((variant) => assetFile(key, variant.variant, variant.contentType)));
    const stale = before.map((row) => assetFile(key, row.variant, row.contentType)).filter((file) => !files.has(file));
    await deleteObjects("assets", stale);
    await publish("assets", { key });
}
