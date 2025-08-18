import { NextRequest } from "next/server";
import * as types from "@/types/api/media/categories/update";
import {
    createClientDB,
    usersDB,
    mediaCategoriesDB,
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
        });
    }

    const json = await safeJSON<types.PostRequest>(request, (json) => json.id && (json.category || json.mediaGroups));
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
        });
    }

    const result = await mediaCategoriesDB.update({
        pb,
        id: json.id,
        value: {
            category: json.category,
            mediaGroups: {
                set: json.mediaGroups?.set,
                append: json.mediaGroups?.append,
                remove: json.mediaGroups?.remove,
            },
        },
    });
    if (result == null) {
        return responseJSON<types.PostResponse>(500, {
            success: false,
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
    });
}
