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
import { serverConfig } from "@server/config";

const i18nMiddleware = createMiddleware(routing);

const HOST_TO_SUBAPP: Record<string, string> = {
    [serverConfig.env.HOST_BASE]: "software",
    [serverConfig.env.HOST_ACCOUNT]: "account",
    [serverConfig.env.HOST_MEDIA]: "media",
    [serverConfig.env.HOST_SOFTWARE]: "software",
};
const SEO_FILES = ["/robots.txt", "/sitemap.xml", "/sitemap-0.xml"];
const GUARDED = [
    "/u",
    "/a",
].map((path) => [
    path,
    ...routing.locales.map((locale) => `/${locale}${path}`),
]).flat();

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const host = (request.headers.get("x-forwarded-host")
        ?? request.headers.get("host")
        ?? "").split(":")[0];
    const subApp = HOST_TO_SUBAPP[host];

    if (SEO_FILES.includes(pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = `/${subApp}${pathname}`;
        return NextResponse.rewrite(url);
    }

    if (GUARDED.includes(pathname) || GUARDED.find(p => pathname.startsWith(p + "/"))) {
        const cookie = getSessionCookie(request);

        if (!cookie) {
            return NextResponse.redirect(getUrlString(request, LOGIN()));
        }
    }

    const response = i18nMiddleware(request);
    if (!response.ok || !subApp) return response;

    const rewritten = response.headers.get("x-middleware-rewrite");
    const url = new URL(rewritten ?? request.url);
    const [, locale, ...rest] = url.pathname.split("/");

    if (rest[0] === subApp) return response;

    url.pathname = `/${locale}/${subApp}${rest.length ? "/" + rest.join("/") : ""}`;
    return NextResponse.rewrite(url, { headers: response.headers });
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|txt|xml)$).*)",
        "/robots.txt", "/sitemap.xml", "/sitemap-0.xml",
    ],
};
