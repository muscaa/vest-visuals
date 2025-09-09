import { NextRequest } from "next/server";
import * as types from "@shared/types/api/media/categories/update";
import {
    safeJSON,
    responseJSON,
} from "@server/http";
import { auth } from "@server/auth";
import * as categories from "@server/media/categories";

export async function POST(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });
    if (!session) {
        return responseJSON<types.PostResponse>(401, {
            success: false,
            error: "Unauthorized",
        });
    }

    const json = await safeJSON<types.PostRequest>(request, (json) => json.id && (json.category || json.mediaGroups));
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            error: "Invalid request body",
        });
    }

    const result = await categories.update(json.id, {
        category: json.category,
        mediaGroups: {
            set: json.mediaGroups?.set,
            append: json.mediaGroups?.append,
            remove: json.mediaGroups?.remove,
        },
    });
    if (!result) {
        return responseJSON<types.PostResponse>(500, {
            success: false,
            error: "Internal server error",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
    });
}
