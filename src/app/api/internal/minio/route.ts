import {
    NextRequest,
    NextResponse
} from "next/server";
import * as config from "@/config/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
    const headersList = await headers();
    const upgrade = headersList.get("upgrade");
    const connection = headersList.get("connection");
    const host = headersList.get("host");
    const xRealIp = headersList.get("x-real-ip");
    const xForwardedFor = headersList.get("x-forwarded-for");

    const url = new URL(request.url);
    if (host != null) {
        url.hostname = host;
        url.port = "";
    }

    return NextResponse.json({
        url: config.env.S3_CONSOLE_URL,
        request_url: request.url,
        host_url: url.toJSON(),
        host_url_string: url.toString(),
        upgrade,
        connection,
        host,
        xRealIp,
        xForwardedFor,
    });
}
