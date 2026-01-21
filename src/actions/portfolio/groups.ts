"use server";

import { ActionResponse } from "@type/http";
import { isAdmin } from "@server/auth/permissions";
import * as types from "@type/portfolio/groups";
import * as groups from "@server/portfolio/groups";

export async function get(id: string): ActionResponse<types.PortfolioGroup> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!id) {
        return ["BAD_REQUEST", "Missing group ID"];
    }

    const result = await groups.get(id);
    if (!result) {
        return ["NOT_FOUND", "Group not found"];
    }

    return ["OK", result];
}

export async function getAll(): ActionResponse<types.PartialPortfolioGroup[]> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    const result = await groups.getAllPartial();
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not retrieve groups"];
    }

    return ["OK", result];
}

export async function create(value: types.CreateProps): ActionResponse<types.PartialPortfolioGroup> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!value) {
        return ["BAD_REQUEST", "Missing group properties"];
    }

    const result = await groups.create(value);
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not create group"];
    }

    return ["OK", result];
}

export async function update(id: string, value: types.UpdateProps): ActionResponse<void> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!id || !value) {
        return ["BAD_REQUEST", "Missing group ID or properties"];
    }

    const result = await groups.update(id, value);
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not update group"];
    }

    return ["OK"];
}

export async function remove(ids: string[]): ActionResponse<void> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!ids || ids.length === 0) {
        return ["BAD_REQUEST", "No group IDs provided"];
    }

    const result = groups.removeList(ids);
    if (!result) {
        return ["NOT_FOUND", "Groups not found"];
    }

    return ["OK"];
}
