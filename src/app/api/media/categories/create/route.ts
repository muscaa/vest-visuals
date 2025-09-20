import { NextRequest } from "next/server";
import * as types from "@type/api/media/categories/create";
import {
    safeJSON,
    responseJSON,
} from "@server/http";
import { isAdmin } from "@server/auth/permissions";
import * as categories from "@server/media/categories";

export async function POST(request: NextRequest) {
    const admin = await isAdmin({ request });
    if (!admin) {
        return responseJSON<types.PostResponse>(401, {
            success: false,
            error: "Unauthorized",
        });
    }

    const json = await safeJSON<types.PostRequest>(request, (json) => json.value);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            error: "Invalid request body",
        });
    }

    const result = await categories.create(json.value);
    if (!result) {
        return responseJSON<types.PostResponse>(500, {
            success: false,
            error: "Failed to create media category",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        value: result,
    });
}
