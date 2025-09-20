import { NextRequest } from "next/server";
import * as types from "@type/api/media/groups/remove";
import {
    safeJSON,
    responseJSON,
} from "@server/http";
import { isAdmin } from "@server/auth/permissions";
import * as groups from "@server/media/groups";

export async function POST(request: NextRequest) {
    const admin = await isAdmin({ request });
    if (!admin) {
        return responseJSON<types.PostResponse>(401, {
            success: false,
            error: "Unauthorized",
        });
    }

    const json = await safeJSON<types.PostRequest>(request, (json) => json.ids);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            error: "Invalid request body",
        });
    }

    const result = groups.removeAll(json.ids);
    if (!result) {
        return responseJSON<types.PostResponse>(404, {
            success: false,
            error: "Media groups not found",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
    });
}
