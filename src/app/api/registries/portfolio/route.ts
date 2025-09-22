import { NextRequest } from "next/server";
import * as types from "@type/api/registries/portfolio";
import {
    safeJSON,
    responseJSON,
} from "@server/http";
import { getRegistry } from "@server/registry";

export async function POST(request: NextRequest) {
    const json = await safeJSON<types.PostRequest>(request);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            error: "Invalid request body",
        });
    }

    return responseJSON<types.PostResponse>(200, {
        success: true,
        value: getRegistry("portfolio"),
    });
}
