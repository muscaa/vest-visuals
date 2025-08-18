import { NextRequest } from "next/server";
import * as types from "@/types/api/media/contents";
import {
    createClientDB,
    usersDB,
    mediaContentsDB,
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

    const json = await safeJSON<types.PostRequest>(request);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            message: "Invalid request body",
        });
    }

    const result = await mediaContentsDB.getList({
        pb,
        options: {
            expand: "mediaVariants",
        },
    });
    if (result == null) {
        return responseJSON<types.PostResponse>(500, {
            success: false,
            message: "Internal server error",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        values: result.map((value) => ({
            id: value.id,
            mediaVariants: value.expand!.mediaVariants!.map((variant) => ({
                id: variant.id,
                variant: variant.variant,
                file: variant.file,
                type: variant.type,
                info: variant.info,
                created: variant.created,
                updated: variant.updated,
            })),
            created: value.created,
            updated: value.updated,
        })),
    });
}
