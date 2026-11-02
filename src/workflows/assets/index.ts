import { findAssetOriginal, makeAssetSize, saveAssetVariants } from "./steps";
import type { AssetSize } from "@shared/assets";

/**
 * Makes an asset's sizes again from its stored original, only the ones given: new ones are added, the others deleted.
 * Started by `changeAssetVariants`.
 */
export async function reprocessAsset(key: string, sizes: AssetSize[]) {
    "use workflow";

    const original = await findAssetOriginal(key);
    const made = await Promise.all(sizes.map((size) => makeAssetSize(original.source, key, size)));
    await saveAssetVariants(key, [original.variant, ...made]);
    // TODO: once Cloudflare is in front of the assets, purge the remade urls (`purgeUrls` in @server/cloudflare)
}
