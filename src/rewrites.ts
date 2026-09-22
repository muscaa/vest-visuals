import { deLocalizeUrl, localizeUrl } from "@shared/paraglide/runtime";
import { env } from "./env";
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
    media: env.VITE_REWRITE_BRIDGE_MEDIA,
    software: env.VITE_REWRITE_BRIDGE_SOFTWARE,
} satisfies Record<string, string>;

type Bridge = keyof typeof bridges;
const bridgeKeys = Object.keys(bridges) as Bridge[];

function urlToBridge(url: URL): Bridge {
    return (
        bridgeKeys.find((value) => bridges[value] === url.host) ??
        bridgeKeys.find((value) => bridges[value] === url.hostname) ??
        "software"
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
