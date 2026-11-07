/**
 * Google Analytics, loaded only once visitors accept analytics cookies, never before. Page changes are counted by
 * Analytics itself (enhanced measurement follows the browser's history), so nothing is sent by hand.
 */
import { envClient } from "@client/env";

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
        [disable: `ga-disable-${string}`]: boolean | undefined;
    }
}

/** Starts Analytics, or turns it back on; nothing without `PUBLIC_GA_MEASUREMENT_ID`. */
export function startAnalytics() {
    const id = envClient.PUBLIC_GA_MEASUREMENT_ID;
    if (!id) return;

    window[`ga-disable-${id}`] = false;
    if (window.gtag) return;

    window.dataLayer ??= [];
    // gtag's own snippet: it queues calls until its script runs them
    window.gtag = function gtag() {
        // `arguments`, not rest parameters: the script reads arguments objects
        window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", id);

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.append(script);
}

/** Stops Analytics and deletes its cookies, when visitors take their consent back. */
export function stopAnalytics() {
    const id = envClient.PUBLIC_GA_MEASUREMENT_ID;
    if (!id) return;

    window[`ga-disable-${id}`] = true;
    const domains = [envClient.PUBLIC_COOKIE_DOMAIN, window.location.hostname].filter(Boolean);
    for (const name of document.cookie.split("; ").map((entry) => entry.split("=")[0]).filter((name) => name.startsWith("_ga"))) {
        for (const domain of domains) document.cookie = `${name}=; path=/; max-age=0; domain=${domain}`;
        document.cookie = `${name}=; path=/; max-age=0`;
    }
}
