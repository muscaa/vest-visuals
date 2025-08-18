import {
    NextRequest,
    NextResponse,
} from "next/server";
import { usersDB } from "@/utils/server/db";
import { getUrlString } from "@/utils/server/request";

export async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const pathname = url.pathname;

    if (!pathname.startsWith("/a/") && pathname != "/a") {
        return NextResponse.next();
    }

    const user = await usersDB.get({
        cookies: request.cookies,
    });

    if (!user) {
        return NextResponse.redirect(getUrlString(request, "/login"));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
