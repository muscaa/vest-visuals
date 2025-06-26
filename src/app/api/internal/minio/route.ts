import {
    NextRequest,
    NextResponse
} from "next/server";
import * as config from "@/config/server";

export async function GET(request: NextRequest) {
    return NextResponse.json({
        url: config.env.S3_CONSOLE_URL,
        request_url: request.url,
    });
}
