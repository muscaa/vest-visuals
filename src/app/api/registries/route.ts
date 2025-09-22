import { NextRequest } from "next/server";
import * as types from "@type/api/registries";
import {
    safeJSON,
    responseJSON,
} from "@server/http";
import { isAdmin } from "@server/auth/permissions";
import { updateRegistry } from "@server/registry";

export async function POST(request: NextRequest) {
    const admin = await isAdmin({ request });
    if (!admin) {
        return responseJSON<types.PostResponse>(401, {
            success: false,
            error: "Unauthorized",
        });
    }

    const json = await safeJSON<types.PostRequest>(request, (json) => json.name && json.value);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            error: "Invalid request body",
        });
    }

    updateRegistry(json.name, (reg: any) => {
        for (const [key, _] of Object.entries(reg)) {
            reg[key] = undefined;
        }

        for (const [key, value] of Object.entries(json.value)) {
            reg[key] = value;
        }
    });

    return responseJSON<types.PostResponse>(200, {
        success: true,
    });
}
