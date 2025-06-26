import {
    NextRequest,
    NextResponse
} from "next/server";
import * as config from "@/config/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
    const headersList = await headers();
    const xRealUrl = headersList.get("x-real-url");

    if (xRealUrl == null || !xRealUrl.startsWith(config.env.S3_CONSOLE_URL)) {
        return NextResponse.redirect(config.env.S3_CONSOLE_URL);
    }

    const url = new URL(xRealUrl);
    const cookies: string[] = JSON.parse(decodeURIComponent(url.searchParams.get("cookies") || "[]"));

    if (cookies.length == 0) {
        return NextResponse.redirect(config.env.S3_CONSOLE_URL);
    }

    const response = NextResponse.redirect(config.env.S3_CONSOLE_URL);
    for (const cookie of cookies) {
        response.headers.append("Set-Cookie", cookie);
    }

    return response;
}
