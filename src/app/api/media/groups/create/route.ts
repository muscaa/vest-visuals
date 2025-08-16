import { NextRequest } from "next/server";
import * as types from "@/types/api/media/groups/create";
import {
    createClientDB,
    usersDB,
    newMediaGroupsDB,
} from "@/utils/server/db";
import { safeJSON } from "@/utils/server/request";
import { responseJSON } from "@/utils/server/response";

export async function POST(request: NextRequest) {
    const pb = await createClientDB();

    const user = await usersDB.get({
        pb,
        cookies: request.cookies,
        redirect: false,
    });
    if (!user) {
        return responseJSON<types.PostResponse>(401, {
            success: false,
        });
    }

    const json = await safeJSON<types.PostRequest>(request);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
        });
    }

    const result = await newMediaGroupsDB.create({
        pb,
        value: {
            media: json.media,
        },
    });
    if (result == null) {
        return responseJSON<types.PostResponse>(500, {
            success: false,
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        value: {
            id: result.id,
            media: result.media,
            created: result.created,
            updated: result.updated,
        },
    });
}
