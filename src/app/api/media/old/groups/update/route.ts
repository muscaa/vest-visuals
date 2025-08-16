import { NextRequest } from "next/server";
import * as types from "@/types/api/media/old/groups/update";
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

    const json = await safeJSON<types.PostRequest>(request, (json) => json.id && (json.category || json.mediaVariants));
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
        });
    }

    const updateResult = await mediaGroupsDB.update({
        pb,
        id: json.id,
        value: {
            category: json.category,
            mediaVariants: json.mediaVariants?.replace,
            "mediaVariants+": json.mediaVariants?.append,
            "mediaVariants-": json.mediaVariants?.remove,
        },
    });
    if (updateResult == null) {
        return responseJSON<types.PostResponse>(500, {
            success: false,
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
    });
}
