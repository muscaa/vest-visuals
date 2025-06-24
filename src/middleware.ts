import {
    NextRequest,
    NextResponse,
} from "next/server";
import PocketBase from "pocketbase";
import * as server_config from "@/config/server";

export async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const pathname = url.pathname;

    if (!pathname.startsWith("/a/") && pathname != "/a") {
        return NextResponse.next();
    }

    const session_token = request.cookies.get("session_token")?.value;

    if (!session_token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const pb = new PocketBase(server_config.env.POCKETBASE_URL);
    pb.authStore.save(session_token, null);

    try {
        await pb.collection("users").authRefresh();
        
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/login", request.url));
    }
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
