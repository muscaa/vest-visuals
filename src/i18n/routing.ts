import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["ro", "en"],

    // Used when no locale matches
    defaultLocale: "ro",
    localePrefix: "as-needed",
    pathnames: {
        "/": "/",
        "/contact": {
            en: "/kontakt",
        },
        // TODO
    },
});
