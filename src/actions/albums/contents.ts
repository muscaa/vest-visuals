"use server";

import { ActionResponse } from "@type/http";
import { isAdmin } from "@server/auth/permissions";
import * as types from "@type/albums/contents";
import * as contents from "@server/albums/contents";

export async function get(id: string): ActionResponse<types.AlbumsContent> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!id) {
        return ["BAD_REQUEST", "Missing content ID"];
    }

    const result = await contents.get(id);
    if (!result) {
        return ["NOT_FOUND", "Content not found"];
    }

    return ["OK", result];
}

export async function getAll(): ActionResponse<types.PartialAlbumsContent[]> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    const result = await contents.getAllPartial();
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not retrieve contents"];
    }

    return ["OK", result];
}

export async function getByPath(albumId: string, path?: string[]): ActionResponse<types.AlbumsContent[]> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    const result = await contents.getByPath(albumId, path);
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not retrieve contents"];
    }

    return ["OK", result];
}

export async function update(id: string, value: types.UpdateProps): ActionResponse<void> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!id || !value) {
        return ["BAD_REQUEST", "Missing content ID or properties"];
    }

    const result = await contents.update(id, value);
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not update content"];
    }

    return ["OK"];
}

export async function remove(id: string): ActionResponse<void> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!id) {
        return ["BAD_REQUEST", "Missing content ID"];
    }

    const result = contents.remove(id);
    if (!result) {
        return ["NOT_FOUND", "Content not found"];
    }

    return ["OK"];
}
