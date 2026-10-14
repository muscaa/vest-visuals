/**
 * Paraglide setup that doesn't fit in the vite plugin's options, read by vite.config.ts at build time (not bundled).
 *
 * ## Translated urls
 *
 * Routes and links stay in english in the code. Paraglide's url rewrite turns them into
 * `/ro/servicii/nunta` for romanian and `/en/services/wedding` for english.
 * Urls without a locale, like `/`, redirect to the visitor's locale (cookie, then browser language, then romanian).
 *
 * Two ways to translate a url:
 * - add its words to `segments`; every route using them is translated automatically
 * - add a whole pattern to `patterns`, in paraglide's own format, when a word by word translation doesn't fit
 */
import { globSync } from "node:fs";
import { join, sep } from "node:path";
import type { Plugin } from "vite";

type Locale = "ro" | "en";

interface UrlPattern {
    pattern: string;
    localized: [Locale, string][];
}

/** Path prefix of each locale. */
const prefixes: Record<Locale, string> = {
    ro: "/ro",
    en: "/en",
};

/** Words of the english urls, by locale. Words that aren't listed stay as they are. */
const segments: Record<string, Partial<Record<Locale, string>>> = {
    // shared
    services: { ro: "servicii" },
    terms: { ro: "termeni" },
    privacy: { ro: "confidentialitate" },
    // account
    login: { ro: "autentificare" },
    signup: { ro: "inregistrare" },
    verify: { ro: "verificare" },
    "forgot-password": { ro: "parola-uitata" },
    "reset-password": { ro: "resetare-parola" },
    // media
    locations: { ro: "locatii" },
    wedding: { ro: "nunta" },
    christening: { ro: "botez" },
    "18th-birthday": { ro: "majorat" },
    "photo-session": { ro: "sedinta-foto" },
    "real-estate": { ro: "imobiliare" },
    automotive: { ro: "auto" },
    "business-promotion": { ro: "promovare-afaceri" },
    // software
    "web-apps": { ro: "aplicatii-web" },
    "mobile-apps": { ro: "aplicatii-mobile" },
    "custom-software": { ro: "software-personalizat" },
    "data-engineering": { ro: "inginerie-date" },
    "process-automation": { ro: "automatizare-procese" },
    "technical-consulting": { ro: "consultanta-tehnica" },
    "support-maintenance": { ro: "suport-mentenanta" },
};

/**
 * Hand written patterns, checked before the generated ones.
 * Same format as paraglide's `urlPatterns`: https://paraglidejs.com/i18n-routing
 */
const patterns: UrlPattern[] = [
    // {
    //     pattern: "/services/wedding",
    //     localized: [
    //         ["ro", "/ro/servicii/nunta"],
    //         ["en", "/en/services/wedding"],
    //     ],
    // },
];

const locales = Object.keys(prefixes) as Locale[];

/**
 * Public paths of every page, as visitors see them on their subdomain: `/media/services/wedding` is `/services/wedding`.
 * Pathless folders (`_home`) and the division folder are dropped, params (`$id`) become `:id`.
 */
function routePaths(routesDirectory: string): string[] {
    const paths = new Set<string>();

    for (const file of globSync("**/{index,route}.tsx", { cwd: routesDirectory })) {
        const [, ...folders] = file.split(sep).slice(0, -1);
        const path = folders
            .filter((folder) => !folder.startsWith("_") && !folder.startsWith("("))
            .map((folder) => (folder.startsWith("$") ? `:${folder.slice(1)}` : folder));

        paths.add(`/${path.join("/")}`);
    }

    return [...paths];
}

function translatePath(path: string, locale: Locale): string {
    const translated = path
        .split("/")
        .map((segment) => segments[segment]?.[locale] ?? segment)
        .join("/");

    return `${prefixes[locale]}${translated}`;
}

/** The `urlPatterns` option of paraglide's vite plugin. */
export function urlPatterns(routesDirectory: string): UrlPattern[] {
    const handWritten = new Set(patterns.map(({ pattern }) => pattern));

    const generated = routePaths(routesDirectory)
        // untranslated paths are covered by the catch all below
        .filter((path) => !handWritten.has(path) && locales.some((locale) => translatePath(path, locale) !== `${prefixes[locale]}${path}`))
        .map((path) => ({
            pattern: path,
            localized: locales.map((locale): [Locale, string] => [locale, translatePath(path, locale)]),
        }));

    const catchAll: UrlPattern = {
        pattern: "/:path(.*)?",
        localized: locales.map((locale): [Locale, string] => [locale, `${prefixes[locale]}/:path(.*)?`]),
    };

    return [...patterns, ...generated, catchAll];
}

/**
 * Sets paraglide's `cookieDomain` from the runtime env instead of the build, so the locale cookie is shared by every subdomain.
 * Paraglide only accepts a fixed string for it, so this rewrites that one line of the generated runtime as vite loads it.
 * The file on disk stays as paraglide wrote it. Fails the build if paraglide ever changes the line.
 *
 * Only read in the browser, which is the only place the cookie gets written. On the server this line can run before
 * `@server/env` fills the public env, and `envClient` would throw.
 */
export function paraglideCookieDomain(): Plugin {
    const generated = 'export const cookieDomain = "";';
    let envModule = "";

    return {
        name: "paraglide-cookie-domain",
        configResolved(config) {
            // absolute path: tsconfig aliases don't apply to the generated js
            envModule = join(config.root, "src/lib/client/env.ts");
        },
        transform(code, id) {
            if (!id.split("?")[0].endsWith("/paraglide/runtime.js")) {
                return;
            }
            if (!code.includes(generated)) {
                this.error(`Couldn't find \`${generated}\` in paraglide's runtime, update paraglideCookieDomain() in paraglide.config.ts`);
            }

            return [
                `import { envClient } from ${JSON.stringify(envModule)};`,
                code.replace(generated, 'export const cookieDomain = typeof window === "undefined" ? "" : envClient.PUBLIC_COOKIE_DOMAIN;'),
            ].join("\n");
        },
    };
}
