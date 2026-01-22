import {
    NextRequest,
    NextResponse,
} from "next/server";
import { getUrlString } from "@server/http";
import { getSessionCookie } from "better-auth/cookies";
import { LOGIN } from "@shared/paths";

export async function proxy(request: NextRequest) {
    const url = request.nextUrl;
    const pathname = url.pathname;

    const guarded = [
        "/u",
        "/a",
    ];

    if (!guarded.includes(pathname) && !guarded.find(p => pathname.startsWith(p + "/"))) {
        return NextResponse.next();
    }

    const cookie = getSessionCookie(request);

    if (!cookie) {
        return NextResponse.redirect(getUrlString(request, LOGIN));
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
