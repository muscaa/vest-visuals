import {
    NextRequest,
    NextResponse
} from "next/server";
import * as config from "@/config/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
    const headersList = await headers();

    return NextResponse.json({
        url: config.env.S3_CONSOLE_URL,
        request_url: request.url,
        host: headersList.get("host"),
    });
}
