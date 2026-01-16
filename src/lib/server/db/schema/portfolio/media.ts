import { createMedia } from "@server/db/builder/media";

export type PortfolioMediaVariantsTable = typeof PORTFOLIO_MEDIA_VARIANTS;

export const {
    contentsTable: PORTFOLIO_MEDIA,
    contentsRelations: PORTFOLIO_MEDIA_RELATIONS,
    variantsTable: PORTFOLIO_MEDIA_VARIANTS,
    variantsRelations: PORTFOLIO_MEDIA_VARIANTS_RELATIONS,
} = createMedia({
    contents: {
        name: "portfolio_media",
    },
    variants: {
        name: "portfolio_media_variants",
    },
});
