import { createJiti } from "jiti";
const jiti = createJiti(import.meta.url, { tsconfigPaths: true });
import type { IConfig } from "next-sitemap";
import minimist from "minimist";

import type * as i18n from "@shared/i18n";
const { locales, routing }: typeof i18n = await jiti.import("@shared/i18n.ts"); // stupid next-sitemap can use typescript files, but cant import typescript files...

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
        studio: {
            url: `https://${process.env.HOST_BASE!}`
        },
        software: {
            url: `https://${process.env.HOST_SOFTWARE!}`
        },
    };

    const app = apps[tag];

    return {
        tag,
        ...app,
    };
}

function getLocalePath(path: string, locale: i18n.Locale | "x-default") {
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
            loc: getLocalePath(path, locale as i18n.Locale),
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
