"use server";

import { ActionResponse } from "@type/http";
import { isAdmin } from "@server/auth/permissions";
import * as types from "@type/albums/media";
import * as media from "@server/albums/media";

export async function get(albumId: string, contentId: string): ActionResponse<types.AlbumsMedia> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!albumId || !contentId) {
        return ["BAD_REQUEST", "Missing album ID or media content ID"];
    }

    const result = await media.get(albumId, contentId);
    if (!result) {
        return ["NOT_FOUND", "Media not found"];
    }

    return ["OK", result];
}
