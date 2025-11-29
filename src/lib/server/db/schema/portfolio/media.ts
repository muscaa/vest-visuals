import { createMedia } from "@server/db/core/media";

export const {
    contentsTable: portfolioMedia,
    contentsRelations: portfolioMediaRelations,
    variantsTable: portfolioMediaVariants,
    variantsRelations: portfolioMediaVariantsRelations,
} = createMedia({
    contents: {
        name: "portfolio_media",
    },
    variants: {
        name: "portfolio_media_variants",
    },
});
