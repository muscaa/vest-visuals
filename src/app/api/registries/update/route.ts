import { NextRequest } from "next/server";
import * as types from "@type/api/registries/update";
import {
    safeJSON,
    responseJSON,
} from "@server/http";
import { isAdmin } from "@server/auth/permissions";
import {
    updateRegistry,
    saveRegistry,
} from "@server/registry";
import {
    RegistryKey,
    registries,
} from "@type/registries";

export async function POST(request: NextRequest) {
    const admin = await isAdmin({ request });
    if (!admin) {
        return responseJSON<types.PostResponse>(401, {
            success: false,
            error: "Unauthorized",
        });
    }

    const json = await safeJSON<types.PostRequest>(request, (json) => json.key && json.value);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            error: "Invalid request body",
        });
    }

    const key = json.key as RegistryKey;
    const registry = registries[key];
    if (!registry) {
        return responseJSON<types.PostResponse>(404, {
            success: false,
            error: "Invalid registry key",
        });
    }

    const validation = registry.safeParse(json.value);
    if (!validation.success) {
        return responseJSON<types.PostResponse>(412, {
            success: false,
            error: validation.error.message,
        });
    }

    updateRegistry(key, validation.data);
    await saveRegistry(key);

    return responseJSON<types.PostResponse>(200, {
        success: true,
    });
}
