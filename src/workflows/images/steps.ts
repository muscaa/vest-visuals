/** The steps making an image's variants, for any public bucket: assets, portfolio, later albums. */
import sharp from "sharp";
import { FatalError } from "workflow";
import { copyObject, getObject, putObject } from "@server/s3";
import { imageQuality, imageSizes, variantFile } from "@shared/images";
import type { ImageSize } from "@shared/images";
import type { Bucket, PublicBucket } from "@shared/s3";

/** Browsers keep a file for an hour, Cloudflare for a year; a replaced image is purged from Cloudflare instead. */
const cacheControl = "public, max-age=3600, s-maxage=31536000";

/** A stored file of an image: its original, or one of its sizes. */
export interface ImageVariant {
    variant: string;
    contentType: string;
    width: number;
    height: number;
}

/** Where an image is read from: an upload's file, or a stored original. */
export interface ImageSource {
    bucket: Bucket;
    key: string;
}

/** Where an image's variants go: a folder in a public bucket, e.g. an asset's key or a media's id. */
export interface ImageTarget {
    bucket: PublicBucket;
    folder: string;
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

/**
 * An uploaded file becomes the image's original, as it was uploaded, with the extension of its type. With `filename`,
 * opening it saves it under that name, for files clients download.
 */
export async function copyOriginal(uploadId: string, target: ImageTarget, contentType: string, filename?: string) {
    "use step";

    const key = variantFile(target.folder, "original", contentType);
    await copyObject({ bucket: "uploads", key: uploadId }, { bucket: target.bucket, key }, { contentType, cacheControl, filename });
}

/** One size, as WebP; metadata like the location is left out. */
export async function makeImageSize(source: ImageSource, target: ImageTarget, size: ImageSize): Promise<ImageVariant> {
    "use step";

    const { data, info } = await sharp(await readFile(source))
        .rotate()
        .resize({ width: imageSizes[size], withoutEnlargement: true })
        .webp({ quality: imageQuality })
        .toBuffer({ resolveWithObject: true });

    const contentType = "image/webp";
    await putObject(target.bucket, variantFile(target.folder, size, contentType), data, { contentType, cacheControl });
    return { variant: size, contentType, width: info.width, height: info.height };
}

/** The files `before` had that `after` doesn't: sizes not made anymore, an original of another type. */
export function staleFiles(folder: string, before: ImageVariant[], after: ImageVariant[]) {
    const kept = new Set(after.map((variant) => variantFile(folder, variant.variant, variant.contentType)));
    return before.map((variant) => variantFile(folder, variant.variant, variant.contentType)).filter((file) => !kept.has(file));
}
