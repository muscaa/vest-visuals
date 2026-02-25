"use server";

import { ActionResponse } from "@type/http";
import { isAdmin } from "@server/auth/permissions";
import * as types from "@type/albums/albums";
import * as albums from "@server/albums/albums";

export async function getPartial(id: string): ActionResponse<types.PartialAlbum> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!id) {
        return ["BAD_REQUEST", "Missing album ID"];
    }

    const result = await albums.getPartial(id);
    if (!result) {
        return ["NOT_FOUND", "Album not found"];
    }

    return ["OK", result];
}

export async function getAll(): ActionResponse<types.PartialAlbum[]> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    const result = await albums.getAllPartial();
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not retrieve albums"];
    }

    return ["OK", result];
}

export async function create(value: types.CreateProps): ActionResponse<types.PartialAlbum> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!value) {
        return ["BAD_REQUEST", "Missing album properties"];
    }

    const result = await albums.create(value);
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not create album"];
    }

    return ["OK", result];
}

export async function update(id: string, value: types.UpdateProps): ActionResponse<void> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!id || !value) {
        return ["BAD_REQUEST", "Missing album ID or properties"];
    }

    const result = await albums.update(id, value);
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not update album"];
    }

    return ["OK"];
}

export async function remove(id: string): ActionResponse<void> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!id) {
        return ["BAD_REQUEST", "Missing album ID"];
    }

    const result = albums.remove(id);
    if (!result) {
        return ["NOT_FOUND", "Album not found"];
    }

    return ["OK"];
}
