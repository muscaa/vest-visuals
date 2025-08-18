import { NextRequest } from "next/server";
import * as types from "@/types/api/portfolio";
import { mediaCategoriesDB } from "@/utils/server/db";
import { safeJSON } from "@/utils/server/request";
import { responseJSON } from "@/utils/server/response";

export async function POST(request: NextRequest) {
    const json = await safeJSON<types.PostRequest>(request, (json) => json.category);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
        });
    }

    const result = await mediaCategoriesDB.getByCategory({
        category: json.category,
        options: {
            expand: "mediaGroups,mediaGroups.mediaContents,mediaGroups.mediaContents.mediaVariants",
        },
    });
    if (result == null) {
        return responseJSON<types.PostResponse>(500, {
            success: false,
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        values: result.expand?.mediaGroups?.flatMap((group) =>
            group.expand?.mediaContents?.flatMap((content) => {
                const mediaVariants = content.expand?.mediaVariants || [];
                if (mediaVariants.length == 0) {
                    return [];
                }

                return [
                    {
                        preview: {
                            src: mediaVariants[0].file,
                        },
                        full: {
                            src: mediaVariants[mediaVariants.length > 1 ? 1 : 0].file,
                        },
                    } satisfies types.PortfolioEntry,
                ];
            }) || []
        ) || [],
    });
}
