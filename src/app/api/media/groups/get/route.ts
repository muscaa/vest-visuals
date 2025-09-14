import { NextRequest } from "next/server";
import * as types from "@shared/types/api/media/groups/get";
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
        value: {
            id: result.id,
            description: result.description,
            mediaContents: result.mediaContents.map((content) => ({
                id: content.id,
                mediaVariants: content.mediaVariants.map((variant) => ({
                    id: variant.id,
                    variant: variant.variant,
                    file: variant.fileUrl,
                    type: variant.type,
                    info: variant.info,
                    created: variant.createdAt.toString(),
                    updated: variant.updatedAt.toString(),
                })),
                created: content.createdAt.toString(),
                updated: content.updatedAt.toString(),
            })),
            created: result.createdAt.toString(),
            updated: result.updatedAt.toString(),
        },
    });
}
