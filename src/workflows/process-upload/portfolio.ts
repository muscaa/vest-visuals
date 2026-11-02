import { copyOriginal, makeImageSize, readImageSize } from "../images/steps";
import { createPortfolioMedia, removePortfolioMedia, savePortfolioVariants } from "../portfolio/steps";
import type { ImageSource } from "../images/steps";
import type { Upload } from "@server/uploads";

/**
 * An uploaded photo becomes a new media at the end of its group: there right away, processing, then shown once its
 * original and chosen sizes are saved. If that fails, it's taken out again.
 */
export async function processPortfolio(upload: Extract<Upload, { type: "portfolio" }>) {
    const { groupId, sizes } = upload.data;
    const source: ImageSource = { bucket: "uploads", key: upload.id };

    const mediaId = await createPortfolioMedia(groupId);
    const target = { bucket: "portfolio", folder: mediaId } as const;
    try {
        const original = await readImageSize(source);
        await copyOriginal(upload.id, target, upload.contentType);
        const made = await Promise.all(sizes.map((size) => makeImageSize(source, target, size)));
        await savePortfolioVariants(mediaId, [{ variant: "original", contentType: upload.contentType, ...original }, ...made]);
    } catch (error) {
        await removePortfolioMedia(mediaId);
        throw error;
    }
}
