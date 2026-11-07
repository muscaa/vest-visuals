import { useSyncExternalStore } from "react";
import { onConsentChange, readConsent } from "@client/consent";
import type { Consent } from "@client/consent";

/**
 * The visitor's cookie choice, kept up to date: null while they haven't chosen, undefined on the server and while the
 * page hydrates, as cookies are read in the browser.
 */
export function useConsent(): Consent | null | undefined {
    return useSyncExternalStore(onConsentChange, readConsent, () => undefined);
}
