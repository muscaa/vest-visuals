import { saveAssetVariants } from "../assets/steps";
import { copyOriginal, makeImageSize, readImageSize } from "../images/steps";
import type { ImageSource } from "../images/steps";
import type { Upload } from "@server/uploads";

/**
 * An uploaded image becomes the asset under its key: the original as uploaded and the chosen sizes as WebP, then their
 * rows, which make it ready. Replacing one writes over its files and deletes the variants it no longer has.
 */
export async function processAsset(upload: Extract<Upload, { type: "asset" }>) {
    const { key, sizes } = upload.data;
    const source: ImageSource = { bucket: "uploads", key: upload.id };
    const target = { bucket: "assets", folder: key } as const;

    const original = await readImageSize(source);
    await copyOriginal(upload.id, target, upload.contentType);
    const made = await Promise.all(sizes.map((size) => makeImageSize(source, target, size)));
    await saveAssetVariants(key, [{ variant: "original", contentType: upload.contentType, ...original }, ...made]);
    // TODO: once Cloudflare is in front of the assets, purge a replaced asset's urls (`purgeUrls` in @server/cloudflare)
}
