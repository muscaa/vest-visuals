/**
 * Visitors' cookie choice, in a cookie on the shared cookie domain, so choosing on one site counts on every subdomain.
 * "necessary": only what the sites need to work (sign in, language, theme, the captcha); "all": analytics too.
 */
import { envClient } from "@client/env";

export type Consent = "all" | "necessary";

const cookie = "cookie_consent";
/** half a year, then they're asked again */
const maxAge = 180 * 24 * 60 * 60;
const changed = "cookie-consent";
const settings = "cookie-settings";

/** Their choice, or null while they haven't made one. */
export function readConsent(): Consent | null {
    const value = document.cookie.match(new RegExp(`(?:^|; )${cookie}=([^;]*)`))?.[1];
    return value === "all" || value === "necessary" ? value : null;
}

export function writeConsent(consent: Consent) {
    const domain = envClient.PUBLIC_COOKIE_DOMAIN;
    document.cookie = [`${cookie}=${consent}`, "path=/", `max-age=${maxAge}`, "samesite=lax", ...(domain ? [`domain=${domain}`] : [])].join("; ");
    window.dispatchEvent(new Event(changed));
}

/** Calls `listener` when the choice changes, here or in another tab; returns how to stop. */
export function onConsentChange(listener: () => void) {
    window.addEventListener(changed, listener);
    // another tab's choice shows when this one is looked at again
    window.addEventListener("focus", listener);
    return () => {
        window.removeEventListener(changed, listener);
        window.removeEventListener("focus", listener);
    };
}

/** Opens the banner again, to change the choice; e.g. from the footer. */
export function openCookieSettings() {
    window.dispatchEvent(new Event(settings));
}

export function onCookieSettings(listener: () => void) {
    window.addEventListener(settings, listener);
    return () => window.removeEventListener(settings, listener);
}
