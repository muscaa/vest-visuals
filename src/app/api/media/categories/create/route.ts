import { NextRequest } from "next/server";
import * as types from "@shared/types/api/media/categories/create";
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

    const json = await safeJSON<types.PostRequest>(request);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            error: "Invalid request body",
        });
    }

    const result = await categories.create({
        category: json.category,
        mediaGroups: json.mediaGroups,
    });
    if (!result) {
        return responseJSON<types.PostResponse>(500, {
            success: false,
            error: "Failed to create media category",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        value: {
            id: result.id,
            category: result.category,
            mediaGroups: result.mediaGroupIds,
            created: result.createdAt.toString(),
            updated: result.updatedAt.toString(),
        },
    });
}
