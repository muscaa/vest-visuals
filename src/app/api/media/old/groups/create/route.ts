import { NextRequest } from "next/server";
import * as types from "@/types/api/media/old/groups/create";
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

    const createResult = await mediaGroupsDB.create({
        pb,
        value: {
            id: json.id,
            category: json.category,
            mediaVariants: json.mediaVariants,
        },
    });
    if (createResult == null) {
        return responseJSON<types.PostResponse>(500, {
            success: false,
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        value: createResult,
    });
}
