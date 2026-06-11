import type { IConfig } from "next-sitemap";
import minimist from "minimist";
import { Locale, locales, routing } from "@shared/i18n";

const args = minimist(process.argv.slice(2));

interface App {
    tag: string;
    url: string;
}

function clean(str: string) {
    return str.replace(/^\/+|\/+$/g, "");
}

function getApp(tag: string): App {
    const apps: Record<string, Omit<App, "tag">> = {
        account: {
            url: `https://${process.env.HOST_ACCOUNT!}`
        },
        media: {
            url: `https://${process.env.HOST_MEDIA!}`
        },
        software: {
            url: `https://${process.env.HOST_BASE!}`
        },
    };

    const app = apps[tag];

    return {
        tag,
        ...app,
    };
}

function getLocalePath(path: string, locale: Locale | "x-default") {
    if (locale == "x-default") return path;

    const localepaths = routing.pathnames[`/${path}`];
    if (!localepaths) return clean(`${locale}/${path}`);

    const localepath = localepaths[locale];
    if (!localepath) return clean(`${locale}/${path}`);

    return clean(`${locale}/${localepath.substring(1)}`);
}

const app = getApp(args.app);

export default {
    siteUrl: app.url,
    changefreq: "weekly",
    priority: 0.7,
    autoLastmod: true,
    generateRobotsTxt: true,
    outDir: `public/${app.tag}`,
    transform: (config, path) => {
        const [locale, tag, ...paths] = clean(path).split("/");
        path = paths.join("/");

        if (tag != app.tag) return undefined;

        return {
            loc: getLocalePath(path, locale as Locale),
            alternateRefs: ([...locales, "x-default"] as const).map((locale) => ({
                href: clean(`${app.url}/${getLocalePath(path, locale)}`),
                hreflang: locale,
                hrefIsAbsolute: true,
            })),
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        };
    },
} satisfies IConfig;
