import {
    NextRequest,
    NextResponse,
} from "next/server";
import { getUrlString } from "@server/http";
import { getSessionCookie } from "better-auth/cookies";
import {
    routing,
    LOGIN,
} from "@shared/i18n";
import createMiddleware from "next-intl/middleware";

const i18nMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
    const url = request.nextUrl;
    const pathname = url.pathname;

    const guarded = [
        "/u",
        "/a",
    ];

    const guardedPathnames = guarded.map((path) => [
        path,
        ...routing.locales.map((locale) => `/${locale}${path}`),
    ]).flat();

    if (!guardedPathnames.includes(pathname) && !guardedPathnames.find(p => pathname.startsWith(p + "/"))) {
        return i18nMiddleware(request);
    }

    const cookie = getSessionCookie(request);

    if (!cookie) {
        return NextResponse.redirect(getUrlString(request, LOGIN()));
    }

    return i18nMiddleware(request);
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
