import { NextRequest } from "next/server";
import * as types from "@shared/types/api/portfolio";
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

                return [
                    {
                        preview: {
                            src: mediaVariants[0].fileUrl,
                        },
                        full: {
                            src: mediaVariants[mediaVariants.length > 1 ? 1 : 0].fileUrl,
                        },
                    } satisfies types.PortfolioEntry,
                ];
            }),
        ),
    });
}
