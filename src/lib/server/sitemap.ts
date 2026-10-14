import { locales, localizeUrl } from "@shared/paraglide/runtime";
import { getRouter } from "@/router";

/** Sites with public pages. Each subdomain is its own site to search engines, with its own sitemap and robots.txt. */
export type IndexedDivision = "home" | "media" | "software";

let routeIds: string[] | undefined;

/** Ids of every route, read from the router so new pages show up without touching this file. */
function getRouteIds(): string[] {
    routeIds ??= Object.keys(getRouter().routesById);
    return routeIds;
}

/**
 * Public paths of a division's pages, as visitors see them on its subdomain: `/services/wedding`.
 * Only index routes are pages (layouts like `/services` aren't), and routes with params can't be listed.
 */
function pagePaths(division: IndexedDivision): string[] {
    const prefix = `/${division}/`;

    return getRouteIds()
        .filter((id) => id.startsWith(prefix) && id.endsWith("/") && !id.includes("$"))
        .map((id) => {
            const path = id
                .slice(prefix.length - 1, -1)
                .split("/")
                .filter((segment) => !segment.startsWith("_"))
                .join("/");

            return path || "/";
        });
}

function xml(response: string, contentType: string) {
    return new Response(response, {
        headers: {
            "Content-Type": `${contentType}; charset=utf-8`,
            "Cache-Control": "public, max-age=3600",
        },
    });
}

/**
 * Every page in every locale, with each version linked to the others through hreflang.
 * `x-default` is the url without a locale, which redirects to the visitor's language.
 */
export function sitemapResponse(request: Request, division: IndexedDivision): Response {
    const origin = new URL(request.url).origin;

    const entries = pagePaths(division).flatMap((path) => {
        const base = new URL(path, origin);
        const versions = locales.map((locale) => ({ locale, href: localizeUrl(base, { locale }).href }));
        const alternates = [
            ...versions.map(({ locale, href }) => `<xhtml:link rel="alternate" hreflang="${locale}" href="${href}"/>`),
            `<xhtml:link rel="alternate" hreflang="x-default" href="${base.href}"/>`,
        ].join("");

        return versions.map(({ href }) => `<url><loc>${href}</loc>${alternates}</url>`);
    });

    return xml(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join("")}</urlset>`,
        "application/xml",
    );
}

/** Lets crawlers in and points them to the sitemap. Without a division (the account site), keeps them out. */
export function robotsResponse(request: Request, division?: IndexedDivision): Response {
    const origin = new URL(request.url).origin;
    const rules = division
        ? ["User-agent: *", "Allow: /", "", `Sitemap: ${origin}/sitemap.xml`]
        : ["User-agent: *", "Disallow: /"];

    return xml(`${rules.join("\n")}\n`, "text/plain");
}
