import { makeImageSize } from "../images/steps";
import { findPortfolioOriginal, savePortfolioVariants } from "./steps";
import type { ImageSize } from "@shared/images";

/**
 * Makes a portfolio photo's sizes again from its stored original, only the ones given: new ones are added, the others
 * deleted. Started by `changePortfolioMediaVariants`.
 */
export async function reprocessPortfolioMedia(mediaId: string, sizes: ImageSize[]) {
    "use workflow";

    const original = await findPortfolioOriginal(mediaId);
    const target = { bucket: "portfolio", folder: mediaId } as const;
    const made = await Promise.all(sizes.map((size) => makeImageSize(original.source, target, size)));
    await savePortfolioVariants(mediaId, [original.variant, ...made]);
}
