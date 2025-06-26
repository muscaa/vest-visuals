import {
    NextRequest,
    NextResponse
} from "next/server";
import * as config from "@/config/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
    const headersList = await headers();
    const host = headersList.get("host");

    const url = new URL(request.url);
    if (host != null) {
        url.host = host;
    }

    return NextResponse.json({
        url: config.env.S3_CONSOLE_URL,
        request_url: request.url,
        host: host,
        host_url: JSON.stringify(url),
        host_url_string: url.toString(),
    });
}
