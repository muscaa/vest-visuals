import { NextRequest } from "next/server";
import * as types from "@type/api/minio";
import {
    safeJSON,
    responseJSON,
} from "@server/http";
import { isAdmin } from "@server/auth/permissions";
import { serverConfig } from "@server/config";

export async function POST(request: NextRequest) {
    const admin = await isAdmin({ request });
    if (!admin) {
        return responseJSON<types.PostResponse>(401, {
            success: false,
            error: "Unauthorized",
        });
    }

    const json = await safeJSON<types.PostRequest>(request);
    if (json == null) {
        return responseJSON<types.PostResponse>(400, {
            success: false,
            error: "Invalid request body",
        });
    }

    const loginResponse = await fetch(`${serverConfig.env.S3_CONSOLE_URL}/api/v1/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            accessKey: serverConfig.env.S3_ACCESS_KEY,
            secretKey: serverConfig.env.S3_SECRET_KEY,
        }),
    });

    const cookies = encodeURIComponent(JSON.stringify(loginResponse.headers.getSetCookie()));
    const url = `${serverConfig.env.S3_CONSOLE_URL}/internal/login?cookies=${cookies}`;

    return responseJSON<types.PostResponse>(200, {
        success: true,
        url,
    });
}
