import { getLocale } from "@shared/paraglide/runtime";
import { Turnstile } from "@marsidev/react-turnstile";
import { useRef } from "react";
import { envClient } from "@client/env";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

/**
 * Cloudflare Turnstile for a form: `widget` goes in the form, where it only shows when Cloudflare wants a check, and
 * `withToken` runs the submit with a fresh token. Every token works once, so a new one is made after each submit.
 * Without `PUBLIC_TURNSTILE_SITE_KEY` there's no captcha: no widget, and the token is undefined.
 */
export function useCaptcha() {
    const ref = useRef<TurnstileInstance>(null);
    const siteKey = envClient.PUBLIC_TURNSTILE_SITE_KEY;

    const widget = siteKey && (
        <Turnstile
            ref={ref}
            siteKey={siteKey}
            options={{ appearance: "interaction-only", size: "flexible", language: getLocale() }}
        />
    );

    const withToken = async <T,>(submit: (token: string | undefined) => Promise<T>) => {
        if (!siteKey) return await submit(undefined);

        const token = await ref.current?.getResponsePromise();
        try {
            return await submit(token);
        } finally {
            ref.current?.reset();
        }
    };

    return { widget, withToken };
}

/** The header Better Auth's captcha plugin reads the token from, for the auth client's calls. */
export function captchaHeaders(token: string | undefined) {
    return token ? { "x-captcha-response": token } : undefined;
}
