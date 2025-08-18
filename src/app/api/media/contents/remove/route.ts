import { NextRequest } from "next/server";
import * as types from "@/types/api/media/contents/remove";
import {
    createClientDB,
    usersDB,
    mediaContentsDB,
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

    const json = await safeJSON<types.PostRequest>(request, (json) => json.ids);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            message: "Invalid request body",
        });
    }

    const result = await mediaContentsDB.remove({
        pb,
        ids: json.ids,
    });
    if (!result) {
        return responseJSON<types.PostResponse>(404, {
            success: false,
            message: "Media contents not found",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
    });
}
