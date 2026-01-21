"use server";

import { ActionResponse } from "@type/http";
import { isAdmin } from "@server/auth/permissions";
import * as types from "@type/portfolio/media";
import * as media from "@server/portfolio/media";

export async function get(id: string): ActionResponse<types.PortfolioMedia> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!id) {
        return ["BAD_REQUEST", "Missing media ID"];
    }

    const result = await media.get(id);
    if (!result) {
        return ["NOT_FOUND", "Media not found"];
    }

    return ["OK", result];
}

export async function getAll(): ActionResponse<types.PortfolioMedia[]> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    const result = await media.getAll();
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not retrieve media"];
    }

    return ["OK", result];
}

export async function remove(ids: string[]): ActionResponse<void> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!ids || ids.length === 0) {
        return ["BAD_REQUEST", "No media IDs provided"];
    }

    const result = await media.removeList(ids);
    if (!result) {
        return ["NOT_FOUND", "Media not found"];
    }

    return ["OK"];
}

// upload ??
