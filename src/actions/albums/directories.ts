"use server";

import { ActionResponse } from "@type/http";
import { isAdmin } from "@server/auth/permissions";
import * as types from "@type/albums/directories";
import * as directories from "@server/albums/directories";

export async function get(albumId: string, contentId: string): ActionResponse<types.AlbumsDirectory> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!albumId || !contentId) {
        return ["BAD_REQUEST", "Missing album ID or directory content ID"];
    }

    const result = await directories.get(albumId, contentId);
    if (!result) {
        return ["NOT_FOUND", "Directory not found"];
    }

    return ["OK", result];
}
