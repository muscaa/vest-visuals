"use server";

import { ActionResponse } from "@type/http";
import { isAdmin } from "@server/auth/permissions";
import { serverConfig } from "@server/config";

export async function getLoginUrl(): ActionResponse<string> {
    const admin = await isAdmin({ next: true });
    if (!admin) {
        return ["UNAUTHORIZED", "Unauthorized"];
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

    return ["OK", url];
}
