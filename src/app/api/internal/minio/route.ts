import {
    NextRequest,
    NextResponse
} from "next/server";
import * as config from "@/config/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
    const headersList = await headers();
    const host = headersList.get("host");
    const xRealUrl = headersList.get("x-real-url");

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
        x_real_url: xRealUrl,
    });
}
