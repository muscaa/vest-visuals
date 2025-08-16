import { NextRequest } from "next/server";
import * as types from "@/types/api/media";
import {
    createClientDB,
    mediaDB,
    mediaGroupsDB,
} from "@/utils/server/db";
import { safeJSON } from "@/utils/server/request";
import { server_config } from "@/utils/server/config";
import { responseJSON } from "@/utils/server/response";

export async function POST(request: NextRequest) {
    const pb = await createClientDB();

    const json = await safeJSON<types.PostRequest>(request, (json) => json.category && json.variants);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
        });
    }

    // TODO: add pagination

    const getListResult = await mediaGroupsDB.getList({
        pb,
        options: {
            filter: `category = "${json.category}"`,
            sort: "-created",
            expand: "mediaVariants",
        },
    });

    if (getListResult == null || getListResult.items.length == 0) {
        return responseJSON<types.PostResponse>(404, {
            success: false,
        });
    }

    const values: types.Value[] = [];

    for (const mediaGroup of getListResult.items) {
        if (!mediaGroup.expand || !mediaGroup.expand.mediaVariants) {
            continue;
        }

        for (const mediaVariant of mediaGroup.expand.mediaVariants) {
            const media = await mediaDB.getList({
                pb,
                options: {
                    filter: `(${mediaVariant.media.map((id) => `id = "${id}"`).join(" || ")})
                    && (${json.variants.map((variant) => `variant = "${variant}"`).join(" || ")})`,
                },
            });

            if (media == null) {
                continue;
            }

            const value: types.Value = {};
            for (const item of media.items) {
                if (!item.variant) {
                    continue;
                }

                item.file = `${server_config.env.S3_URL}/public/${item.collectionId}/${item.id}/${item.file}`;

                value[item.variant] = item;
            }

            values.push(value);
        }
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        values,
    });
}
