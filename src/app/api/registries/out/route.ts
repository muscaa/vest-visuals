import { NextRequest } from "next/server";
import * as types from "@type/api/registries/out";
import {
    safeJSON,
    responseJSON,
} from "@server/http";
import {
    getRegistryKey,
    getRegistryEntry,
} from "@server/registry";

export async function POST(request: NextRequest) {
    const json = await safeJSON<types.PostRequest>(request, (json) => json.key);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            error: "Invalid request body",
        });
    }

    const key = getRegistryKey(json.key);
    if (!key) {
        return responseJSON<types.PostResponse>(404, {
            success: false,
            error: "Invalid registry key",
        });
    }

    const entry = getRegistryEntry(key);
    if (!entry) {
        return responseJSON<types.PostResponse>(404, {
            success: false,
            error: "Invalid registry key",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        value: entry.out,
    });
}
