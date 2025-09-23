import { NextRequest } from "next/server";
import * as types from "@type/api/registries";
import {
    safeJSON,
    responseJSON,
} from "@server/http";
import { isAdmin } from "@server/auth/permissions";
import {
    updateRegistry,
    saveRegistry,
} from "@server/registry";
import { registrySchemas } from "@type/registries";

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

    const registrySchema = registrySchemas[json.name];
    if (!registrySchema) {
        return responseJSON<types.PostResponse>(404, {
            success: false,
            error: "Invalid registry name",
        });
    }

    const validation = registrySchema.safeParse(json.value);
    if (!validation.success) {
        return responseJSON<types.PostResponse>(412, {
            success: false,
            error: validation.error.message,
        });
    }

    updateRegistry(json.name, (reg: any) => {
        for (const [key, _] of Object.entries(reg)) {
            reg[key] = undefined;
        }

        for (const [key, value] of Object.entries(validation.data as any)) {
            reg[key] = value;
        }
    });
    await saveRegistry(json.name);

    return responseJSON<types.PostResponse>(200, {
        success: true,
    });
}
