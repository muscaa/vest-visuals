import { deLocalizeUrl, localizeUrl } from "@shared/paraglide/runtime";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";
import { envClient } from "@client/env";
import type { Locale } from "@shared/paraglide/runtime";
import type { LocationRewrite } from "@tanstack/react-router";

//
// paraglide
//
export const rewriteParaglide: LocationRewrite = {
    input: ({ url }) => deLocalizeUrl(url),
    output: ({ url }) => localizeUrl(url),
};

//
// internal bridges
//
const bridges = {
    home: envClient.PUBLIC_REWRITE_BRIDGE_HOME,
    account: envClient.PUBLIC_REWRITE_BRIDGE_ACCOUNT,
    media: envClient.PUBLIC_REWRITE_BRIDGE_MEDIA,
    software: envClient.PUBLIC_REWRITE_BRIDGE_SOFTWARE,
    admin: envClient.PUBLIC_REWRITE_BRIDGE_ADMIN,
} satisfies Record<string, string>;

type Bridge = keyof typeof bridges;
const bridgeKeys = Object.keys(bridges) as Bridge[];

function urlToBridge(url: URL): Bridge {
    return (
        bridgeKeys.find((value) => bridges[value] === url.host) ??
        bridgeKeys.find((value) => bridges[value] === url.hostname) ??
        "home"
    );
}

export const rewriteBridges: LocationRewrite = {
    input: ({ url }) => {
        const bridge = urlToBridge(url);
        url.pathname = `/${bridge}${url.pathname === "/" ? "" : url.pathname}`;
        return url;
    },
    output: ({ url }) => {
        const [, first = "", ...rest] = url.pathname.split("/");
        const bridge = first as Bridge;

        if (!bridgeKeys.includes(bridge)) {
            return url;
        }

        url.pathname = `/${rest.join("/")}`;
        if (bridge !== urlToBridge(url)) {
            url.host = bridges[bridge];
        }
        return url;
    },
};

//
// full urls
//

/** "https:" or "http:", as the page was opened, behind the proxy too (see src/server.ts). */
const currentProtocol = createIsomorphicFn()
    .server(() => getRequestUrl().protocol)
    .client(() => window.location.protocol);

/**
 * A page's full url as visitors see it: `/media/services/wedding` is `https://media.…/ro/servicii/nunta` in romanian.
 * Without a locale, the url that sends visitors to their own language, as in the sitemap's `x-default`.
 */
export function publicPageUrl(path: string, locale?: Locale): URL {
    const [, first = "", ...rest] = path.replace(/(.)\/$/, "$1").split("/");
    const bridge = bridgeKeys.includes(first as Bridge) ? (first as Bridge) : "home";

    const url = new URL(`${currentProtocol()}//${bridges[bridge]}/${rest.join("/")}`);
    return locale ? localizeUrl(url, { locale }) : url;
}
