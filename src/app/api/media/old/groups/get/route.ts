import { NextRequest } from "next/server";
import * as types from "@/types/api/media/old/groups/get";
import {
    createClientDB,
    usersDB,
    mediaGroupsDB,
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

    const json = await safeJSON<types.PostRequest>(request, (json) => json.id);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
        });
    }

    const getResult = await mediaGroupsDB.get({
        pb,
        id: json.id,
        options: {
            expand: "mediaVariants,mediaVariants.media",
        },
    });
    if (getResult == null) {
        return responseJSON<types.PostResponse>(404, {
            success: false,
        });
    }

    if (getResult.expand?.mediaVariants) {
        for (const mediaVariant of getResult.expand?.mediaVariants) {
            if (!mediaVariant.expand?.media) {
                continue;
            }

            for (const media of mediaVariant.expand?.media) {
                media.file = `${server_config.env.S3_URL}/public/${media.collectionId}/${media.id}/${media.file}`;
            }
        }
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        value: getResult,
    });
}
