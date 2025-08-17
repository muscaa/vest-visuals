import { NextRequest } from "next/server";
import * as types from "@/types/api/media/categories/get";
import {
    createClientDB,
    usersDB,
    newMediaCategoriesDB,
} from "@/utils/server/db";
import { safeJSON } from "@/utils/server/request";
import { responseJSON } from "@/utils/server/response";

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

    const result = await newMediaCategoriesDB.get({
        pb,
        id: json.id,
        options: {
            expand: "mediaGroups",
        },
    });
    if (result == null) {
        return responseJSON<types.PostResponse>(404, {
            success: false,
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        value: {
            id: result.id,
            category: result.category,
            mediaGroups: result.expand?.mediaGroups ? result.expand.mediaGroups.map((group) => ({
                id: group.id,
                mediaContents: group.mediaContents,
                created: group.created,
                updated: group.updated,
            })) : [],
            created: result.created,
            updated: result.updated,
        },
    });
}
