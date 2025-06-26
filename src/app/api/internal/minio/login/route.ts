import {
    NextRequest,
    NextResponse
} from "next/server";
import * as config from "@/config/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
    const headersList = await headers();
    const xRealUrl = headersList.get("x-real-url");

    if (xRealUrl == null || !xRealUrl.startsWith(config.env.S3_CONSOLE_URL)) {
        return redirect(config.env.S3_CONSOLE_URL);
    }

    const url = new URL(xRealUrl);
    const token = url.searchParams.get("token");

    if (token == null) {
        return redirect(config.env.S3_CONSOLE_URL);
    }

    const response = NextResponse.redirect(config.env.S3_CONSOLE_URL);
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    return response;
}
