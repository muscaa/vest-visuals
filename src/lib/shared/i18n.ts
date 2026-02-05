import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "ro"] as const;
export type Locale = typeof locales[number];

export type PathnameFunc = ((...args: any[]) => `/${string}`);
export type PathnameLocales = Record<Locale, string>;

export type LocalizedPathname<P extends PathnameFunc, L extends PathnameLocales> = P & L;

function lp<const P extends PathnameFunc, const L extends PathnameLocales>(func: P, locales: L): LocalizedPathname<P, L> {
    Object.assign(func, locales);
    return func as unknown as LocalizedPathname<P, L>;
}

//
// public
//
export const HOME = lp(() => "/", {
    en: "/",
    ro: "/",
});
export const CONTACT = lp(() => "/contact", {
    en: "/contact",
    ro: "/contact",
});
export const PORTFOLIO = lp(() => "/portfolio", {
    en: "/portfolio",
    ro: "/portofoliu",
});
export const PORTFOLIO_$TAG = lp((tag: string) => `${PORTFOLIO()}/${tag}`, {
    en: `${PORTFOLIO.en}/[tag]`,
    ro: `${PORTFOLIO.ro}/[tag]`,
});
export const LOGIN = lp(() => "/login", {
    en: "/login",
    ro: "/autentificare",
});
export const LOGIN_VERIFY = lp(() => `${LOGIN()}/verify`, {
    en: `${LOGIN.en}/verify`,
    ro: `${LOGIN.ro}/verificare`,
});
export const REGISTER = lp(() => "/register", {
    en: "/register",
    ro: "/inregistrare",
});
const SERVICES = lp(() => "/services", {
    en: "/services",
    ro: "/servicii",
});
export const SERVICES_WEDDING = lp(() => `${SERVICES()}/wedding`, {
    en: `${SERVICES.en}/wedding`,
    ro: `${SERVICES.ro}/nunta`,
});
export const PRIVACY_POLICY = lp(() => "/privacy-policy", {
    en: "/privacy-policy",
    ro: "/politica-de-confidentialitate",
});
export const TERMS_OF_SERVICE = lp(() => "/terms-of-service", {
    en: "/terms-of-service",
    ro: "/termeni-si-conditii",
});
export const COOKIE_POLICY = lp(() => "/cookie-policy", {
    en: "/cookie-policy",
    ro: "/politica-de-cookie",
});

//
// private
//
export const U = lp(() => "/u", {
    en: "/u",
    ro: "/u",
});
export const U_ACCOUNT = lp(() => `${U()}/account`, {
    en: `${U.en}/account`,
    ro: `${U.ro}/cont`,
});
export const U_PREFERENCES = lp(() => `${U()}/preferences`, {
    en: `${U.en}/preferences`,
    ro: `${U.ro}/preferinte`,
});
export const A = lp(() => "/a", {
    en: "/a",
    ro: "/a",
});
export const A_CLI = lp(() => `${A()}/cli`, {
    en: `${A.en}/cli`,
    ro: `${A.ro}/cli`,
});
export const A_USERS = lp(() => `${A()}/users`, {
    en: `${A.en}/users`,
    ro: `${A.ro}/utilizatori`,
});
export const A_ASSETS = lp(() => `${A()}/assets`, {
    en: `${A.en}/assets`,
    ro: `${A.ro}/resurse`,
});
const A_PORTFOLIO = lp(() => `${A()}/portfolio`, {
    en: `${A.en}/portfolio`,
    ro: `${A.ro}/portofoliu`,
});
export const A_PORTFOLIO_CATEGORIES = lp(() => `${A_PORTFOLIO()}/categories`, {
    en: `${A_PORTFOLIO.en}/categories`,
    ro: `${A_PORTFOLIO.ro}/categorii`,
});
export const A_PORTFOLIO_CATEGORIES_$ID = lp((id: string) => `${A_PORTFOLIO_CATEGORIES()}/${id}`, {
    en: `${A_PORTFOLIO_CATEGORIES.en}/[id]`,
    ro: `${A_PORTFOLIO_CATEGORIES.ro}/[id]`,
});
export const A_PORTFOLIO_GROUPS = lp(() => `${A_PORTFOLIO()}/groups`, {
    en: `${A_PORTFOLIO.en}/groups`,
    ro: `${A_PORTFOLIO.ro}/grupe`,
});
export const A_PORTFOLIO_GROUPS_$ID = lp((id: string) => `${A_PORTFOLIO_GROUPS()}/${id}`, {
    en: `${A_PORTFOLIO_GROUPS.en}/[id]`,
    ro: `${A_PORTFOLIO_GROUPS.ro}/[id]`,
});
export const A_PORTFOLIO_MEDIA = lp(() => `${A_PORTFOLIO()}/media`, {
    en: `${A_PORTFOLIO.en}/media`,
    ro: `${A_PORTFOLIO.ro}/media`,
});
export const A_REGISTRIES = lp(() => `${A()}/registries`, {
    en: `${A.en}/registries`,
    ro: `${A.ro}/registri`,
});

//
// api
//

//
// assets
//
export const PLACEHOLDER = "/placeholder.jpg"

export const pathnames = [
    // public
    HOME,
    CONTACT,
    PORTFOLIO,
    PORTFOLIO_$TAG,
    LOGIN,
    LOGIN_VERIFY,
    REGISTER,
    SERVICES_WEDDING,
    PRIVACY_POLICY,
    TERMS_OF_SERVICE,
    COOKIE_POLICY,
    // private
    U,
    U_ACCOUNT,
    U_PREFERENCES,
    A,
    A_CLI,
    A_USERS,
    A_ASSETS,
    A_PORTFOLIO_CATEGORIES,
    A_PORTFOLIO_CATEGORIES_$ID,
    A_PORTFOLIO_GROUPS,
    A_PORTFOLIO_GROUPS_$ID,
    A_PORTFOLIO_MEDIA,
    A_REGISTRIES,
] as const;

// export type Pathnames = {
//     [P in typeof pathnames[number]as P["en"]]: {
//         [L in Locale]: P[L];
//     };
// };
// export type Pathname = keyof Pathnames;

export const routing = defineRouting({
    locales,
    defaultLocale: "ro",
    localePrefix: "as-needed",
    pathnames: Object.fromEntries(pathnames.map(p => [p.en, {
        en: p.en,
        ro: p.ro,
    }])) as /* Pathnames */ Record<string, PathnameLocales>,
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
