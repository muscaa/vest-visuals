"use server";

import { ActionResponse } from "@type/http";
import * as types from "@type/portfolio";
import * as categories from "@server/portfolio/categories";

export async function get(tag: string): ActionResponse<types.PortfolioEntry[]> {
    if (!tag) {
        return ["BAD_REQUEST", "Missing category tag"];
    }

    const result = await categories.getByTag(tag);
    if (!result) {
        return ["NOT_FOUND", "Category not found"];
    }

    return ["OK", result.portfolioGroups.flatMap((group) =>
        group.portfolioMedia.flatMap((content) => {
            const mediaVariants = content.portfolioMediaVariants;
            if (mediaVariants.length == 0) {
                return [];
            }

            const first = mediaVariants[0];
            const last = mediaVariants[mediaVariants.length - 1];

            return [
                {
                    preview: {
                        src: first.fileUrl,
                        width: first.info?.width,
                        height: first.info?.height,
                    },
                    full: {
                        src: last.fileUrl,
                        width: last.info?.width,
                        height: last.info?.height,
                    },
                } satisfies types.PortfolioEntry,
            ];
        }),
    )];
}
