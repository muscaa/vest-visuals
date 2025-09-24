import { NextRequest } from "next/server";
import * as types from "@type/api/portfolio";
import {
    safeJSON,
    responseJSON,
} from "@server/http";
import * as categories from "@server/media/categories";

export async function POST(request: NextRequest) {
    const json = await safeJSON<types.PostRequest>(request, (json) => json.category);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            error: "Invalid request body",
        });
    }

    const result = await categories.getByCategory(json.category);
    if (!result) {
        return responseJSON<types.PostResponse>(404, {
            success: false,
            error: "Category not found",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        values: result.mediaGroups.flatMap((group) =>
            group.mediaContents.flatMap((content) => {
                const mediaVariants = content.mediaVariants;
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
        ),
    });
}
