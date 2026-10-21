import { createAuthClient } from "better-auth/react";
import { adminClient, twoFactorClient } from "better-auth/client/plugins";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { RegisteredRouter, ToOptions } from "@tanstack/react-router";
import { sessionQuery } from "@/functions/auth";

/**
 * Sign in, sign up and account changes go through Better Auth's own endpoints, not server functions:
 * only those are rate limited and checked against cross-site requests.
 */
export const authClient = createAuthClient({
    plugins: [
        twoFactorClient(),
        adminClient(),
    ],
});

/** The signed in user, for pages behind `requireSession`. Refreshed with `invalidateQueries(sessionQuery)`. */
export function useUser() {
    const { data } = useSuspenseQuery(sessionQuery);

    if (!data) {
        throw new Error("useUser is only for pages behind requireSession");
    }

    return data.user;
}

/**
 * Full url of a page as visitors see it (`https://account.…/ro/autentificare`), for the links in auth emails
 * and full page loads.
 * Only in the browser, from event handlers.
 */
export function usePublicUrl() {
    const router = useRouter();
    return <const TTo extends string>(options: ToOptions<RegisteredRouter, "/", TTo>) =>
        new URL(router.buildLocation(options as Parameters<typeof router.buildLocation>[0]).publicHref, window.location.origin).href;
}
