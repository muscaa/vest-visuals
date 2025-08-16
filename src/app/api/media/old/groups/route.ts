import { NextRequest } from "next/server";
import * as types from "@/types/api/media/old/groups";
import {
    createClientDB,
    usersDB,
    mediaGroupsDB,
    mediaVariantsDB,
    mediaDB,
} from "@/utils/server/db";
import { safeJSON } from "@/utils/server/request";
import { responseJSON } from "@/utils/server/response";
import { server_config } from "@/utils/server/config";

export async function POST(request: NextRequest) {
    const pb = await createClientDB();

    const user = await usersDB.get({
        pb,
        cookies: request.cookies,
        redirect: false,
    });
    if (!user) {
        return responseJSON<types.PostResponse>(401, {
            success: false,
        });
    }

    const json = await safeJSON<types.PostRequest>(request);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
        });
    }

    // TODO: add pagination

    const getListResult = await mediaGroupsDB.getList({
        pb,
        options: {
            filter: json.filter,
            sort: json.sort || "-created",
        },
    });

    if (getListResult == null) {
        return responseJSON<types.PostResponse>(404, {
            success: false,
        });
    }

    for (const mediaGroup of getListResult.items) {
        if (!mediaGroup.mediaVariants || mediaGroup.mediaVariants.length == 0) {
            continue;
        }

        const mediaVariant = await mediaVariantsDB.get({
            pb,
            id: mediaGroup.mediaVariants[0],
        });
        if (mediaVariant == null) {
            continue;
        }

        const media = await mediaDB.get({
            pb,
            id: mediaVariant.media[0],
        });
        if (media == null) {
            continue;
        }

        media.file = `${server_config.env.S3_URL}/public/${media.collectionId}/${media.id}/${media.file}`;

        mediaVariant.expand = {
            media: [media],
        };
        mediaGroup.expand = {
            mediaVariants: [mediaVariant],
        };
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        values: getListResult.items,
    });
}
