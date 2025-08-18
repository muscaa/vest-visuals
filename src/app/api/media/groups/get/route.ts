import { NextRequest } from "next/server";
import * as types from "@/types/api/media/groups/get";
import {
    createClientDB,
    usersDB,
    mediaGroupsDB,
} from "@/utils/server/db";
import { safeJSON } from "@/utils/server/request";
import { responseJSON } from "@/utils/server/response";

export async function POST(request: NextRequest) {
    const pb = await createClientDB();

    const user = await usersDB.get({
        pb,
        cookies: request.cookies,
    });
    if (!user) {
        return responseJSON<types.PostResponse>(401, {
            success: false,
            message: "Unauthorized",
        });
    }

    const json = await safeJSON<types.PostRequest>(request, (json) => json.id);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            message: "Invalid request body",
        });
    }

    const result = await mediaGroupsDB.get({
        pb,
        id: json.id,
        options: {
            expand: "mediaContents,mediaContents.mediaVariants",
        },
    });
    if (result == null) {
        return responseJSON<types.PostResponse>(404, {
            success: false,
            message: "Media group not found",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        value: {
            id: result.id,
            mediaContents: result.expand?.mediaContents ? result.expand.mediaContents.map((content) => ({
                id: content.id,
                mediaVariants: content.expand?.mediaVariants ? content.expand.mediaVariants.map((variant) => ({
                    id: variant.id,
                    variant: variant.variant,
                    file: variant.file,
                    type: variant.type,
                    info: variant.info,
                    created: variant.created,
                    updated: variant.updated,
                })) : [],
                created: content.created,
                updated: content.updated,
            })) : [],
            created: result.created,
            updated: result.updated,
        },
    });
}
