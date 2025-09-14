import { NextRequest } from "next/server";
import * as types from "@shared/types/api/media/groups";
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

    const json = await safeJSON<types.PostRequest>(request);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            error: "Invalid request body",
        });
    }

    const result = await groups.getAllPartial();
    if (!result) {
        return responseJSON<types.PostResponse>(500, {
            success: false,
            error: "Internal server error",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        values: result.map((value) => ({
            id: value.id,
            description: value.description,
            mediaContents: value.mediaContentIds,
            created: value.createdAt.toString(),
            updated: value.updatedAt.toString(),
        })),
    });
}
