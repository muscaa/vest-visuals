import { NextRequest } from "next/server";
import * as types from "@type/api/media/contents";
import {
    safeJSON,
    responseJSON,
} from "@server/http";
import { isAdmin } from "@server/auth/permissions";
import * as contents from "@server/media/contents";

export async function POST(request: NextRequest) {
    const admin = await isAdmin({ request });
    if (!admin) {
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

    const result = await contents.getAll();
    if (!result) {
        return responseJSON<types.PostResponse>(500, {
            success: false,
            error: "Internal server error",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        values: result,
    });
}
