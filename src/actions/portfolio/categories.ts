"use server";

import { ActionResponse } from "@type/http";
import { isAdmin } from "@server/auth/permissions";
import * as types from "@type/portfolio/categories";
import * as categories from "@server/portfolio/categories";

export async function get(id: string): ActionResponse<types.PortfolioCategory> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!id) {
        return ["BAD_REQUEST", "Missing category ID"];
    }

    const result = await categories.get(id);
    if (!result) {
        return ["NOT_FOUND", "Category not found"];
    }

    return ["OK", result];
}

export async function getAll(): ActionResponse<types.PartialPortfolioCategory[]> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    const result = await categories.getAllPartial();
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not retrieve categories"];
    }

    return ["OK", result];
}

export async function create(value: types.CreateProps): ActionResponse<types.PartialPortfolioCategory> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!value) {
        return ["BAD_REQUEST", "Missing category properties"];
    }

    const result = await categories.create(value);
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not create category"];
    }

    return ["OK", result];
}

export async function update(id: string, value: types.UpdateProps): ActionResponse<void> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!id || !value) {
        return ["BAD_REQUEST", "Missing category ID or properties"];
    }

    const result = await categories.update(id, value);
    if (!result) {
        return ["INTERNAL_SERVER_ERROR", "Could not update category"];
    }

    return ["OK"];
}

export async function remove(ids: string[]): ActionResponse<void> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!ids || ids.length === 0) {
        return ["BAD_REQUEST", "No category IDs provided"];
    }

    const result = categories.removeList(ids);
    if (!result) {
        return ["NOT_FOUND", "Categories not found"];
    }

    return ["OK"];
}
