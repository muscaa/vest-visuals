import {
    NextRequest,
    NextResponse
} from "next/server";
import { getUrlString } from "@/utils/server/request";

export async function GET(request: NextRequest) {
    const res = NextResponse.redirect(getUrlString(request, "/login"));
    res.cookies.delete("session_token");
    return res;
}
