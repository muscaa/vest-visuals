"use server";

import { ActionResponse } from "@type/http";
import { isAdmin } from "@server/auth/permissions";
import {
    RegistryKey,
    RegistryIn,
    RegistryOut,
    Registries,
} from "@type/registries";
import {
    getRegistryKey,
    getRegistryEntry,
    updateRegistry,
    saveRegistry,
} from "@server/registry";

export async function getOutput(keyStr: RegistryKey): ActionResponse<RegistryOut<RegistryKey>> {
    if (!keyStr) {
        return ["BAD_REQUEST", "Missing registry key"];
    }

    const key = getRegistryKey(keyStr);
    if (!key) {
        return ["NOT_FOUND", "Invalid registry key"];
    }

    const entry = getRegistryEntry(key);
    if (!entry) {
        return ["NOT_FOUND", "Invalid registry key"];
    }

    return ["OK", entry.out];
}

export async function getInput(keyStr: RegistryKey): ActionResponse<RegistryIn<RegistryKey>> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!keyStr) {
        return ["BAD_REQUEST", "Missing registry key"];
    }

    const key = getRegistryKey(keyStr);
    if (!key) {
        return ["NOT_FOUND", "Invalid registry key"];
    }

    const entry = getRegistryEntry(key);
    if (!entry) {
        return ["NOT_FOUND", "Invalid registry key"];
    }

    return ["OK", entry.in];
}

export async function update(keyStr: RegistryKey, value: RegistryIn<RegistryKey>): ActionResponse<void> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
    }

    if (!keyStr || !value) {
        return ["BAD_REQUEST", "Missing registry key and/or value"];
    }

    const key = getRegistryKey(keyStr);
    if (!key) {
        return ["NOT_FOUND", "Invalid registry key"];
    }

    const registryIn = Registries[key].in;
    const validation = registryIn.safeParse(value);
    if (!validation.success) {
        return ["NOT_ACCEPTABLE", validation.error.message];
    }

    await updateRegistry(key, validation.data);
    await saveRegistry(key);

    return ["OK"];
}
