import { NextRequest } from "next/server";
import * as types from "@/types/api/media/groups";
import {
    createClientDB,
    usersDB,
    mediaGroupsDB,
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
            message: "Unauthorized",
        });
    }

    const json = await safeJSON<types.PostRequest>(request);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            message: "Invalid request body",
        });
    }

    const result = await mediaGroupsDB.getList({
        pb,
    });
    if (result == null) {
        return responseJSON<types.PostResponse>(500, {
            success: false,
            message: "Internal server error",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        values: result.map((value) => ({
            id: value.id,
            mediaContents: value.mediaContents,
            created: value.created,
            updated: value.updated,
        })),
    });
}
