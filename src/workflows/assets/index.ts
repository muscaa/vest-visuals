import { makeImageSize } from "../images/steps";
import { findAssetOriginal, saveAssetVariants } from "./steps";
import type { ImageSize } from "@shared/images";

/**
 * Makes an asset's sizes again from its stored original, only the ones given: new ones are added, the others deleted.
 * Started by `changeAssetVariants`.
 */
export async function reprocessAsset(key: string, sizes: ImageSize[]) {
    "use workflow";

    const original = await findAssetOriginal(key);
    const target = { bucket: "assets", folder: key } as const;
    const made = await Promise.all(sizes.map((size) => makeImageSize(original.source, target, size)));
    await saveAssetVariants(key, [original.variant, ...made]);
    // TODO: once Cloudflare is in front of the assets, purge the remade urls (`purgeUrls` in @server/cloudflare)
}
