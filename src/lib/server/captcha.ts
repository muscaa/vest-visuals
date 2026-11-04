/**
 * Checking a Turnstile token on the server, for forms outside Better Auth (its own endpoints have its captcha plugin).
 * Without `TURNSTILE_SECRET_KEY` there's no captcha, and every request passes.
 */
import { envServer } from "@server/env";

const siteVerify = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Whether Cloudflare says the token is a real visitor's, and unused. */
export async function verifyCaptcha(token: string | undefined, ip?: string) {
    const secret = envServer.TURNSTILE_SECRET_KEY;
    if (!secret) return true;
    if (!token) return false;

    const response = await fetch(siteVerify, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token, remoteip: ip }),
        signal: AbortSignal.timeout(10_000),
    });
    const result = await response.json() as { success: boolean };
    return result.success;
}
