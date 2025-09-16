import { NextRequest } from "next/server";
import * as types from "@type/api/media/groups/get";
import {
    safeJSON,
    responseJSON,
} from "@server/http";
import { auth } from "@server/auth";
import * as groups from "@server/media/groups";

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

    const json = await safeJSON<types.PostRequest>(request, (json) => json.id);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            error: "Invalid request body",
        });
    }

    const result = await groups.get(json.id);
    if (!result) {
        return responseJSON<types.PostResponse>(404, {
            success: false,
            error: "Media group not found",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        value: result,
    });
}
