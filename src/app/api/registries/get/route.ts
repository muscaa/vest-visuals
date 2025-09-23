import { NextRequest } from "next/server";
import * as types from "@type/api/registries/get";
import {
    safeJSON,
    responseJSON,
} from "@server/http";
import { getRegistry } from "@server/registry";

export async function POST(request: NextRequest) {
    const json = await safeJSON<types.PostRequest>(request, (json) => json.key);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            error: "Invalid request body",
        });
    }

    const registry = getRegistry(json.key);
    if (!registry) {
        return responseJSON<types.PostResponse>(404, {
            success: false,
            error: "Invalid registry key",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        value: registry,
    });
}
