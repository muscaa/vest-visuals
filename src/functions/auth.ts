import { auth } from "@server/auth";
import { isAdmin } from "@shared/auth";
import { queryOptions } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import type { QueryClient } from "@tanstack/react-query";
import type { ParsedLocation } from "@tanstack/react-router";

/** The signed in user's session, or null. */
export const getSession = createServerFn({ method: "GET" }).handler(async () => {
    return await auth.api.getSession({ headers: getRequestHeaders() });
});

/**
 * The session, cached for a minute so moving between pages doesn't ask the server every time.
 * Only for showing pages; server functions working with private data must check the session themselves.
 */
export const sessionQuery = queryOptions({
    queryKey: ["session"],
    queryFn: () => getSession(),
    staleTime: 60_000,
});

/** What the guards need from `beforeLoad`. */
interface GuardOptions {
    context: { queryClient: QueryClient };
    location: ParsedLocation;
}

async function sessionOrLogin({ context, location }: GuardOptions) {
    const session = await context.queryClient.fetchQuery(sessionQuery);

    if (!session) {
        // back to this page after signing in
        throw redirect({ to: "/account/login", search: { redirect: location.href } });
    }

    return session;
}

/** For pages of signed in users: `beforeLoad: requireSession`. Signed out visitors are sent to the login page. */
export async function requireSession(options: GuardOptions) {
    await sessionOrLogin(options);
}

/** Like {@link requireSession}, but only for admins; other users are sent to their account. */
export async function requireAdmin(options: GuardOptions) {
    const session = await sessionOrLogin(options);

    if (!isAdmin(session.user)) {
        throw redirect({ to: "/account" });
    }
}

/**
 * Router options for the login's `redirect`, a path as the router sees it (`/admin/users?page=2`), or the account.
 * Through `to`, so it's rewritten to its subdomain; `href` would skip that.
 */
export function redirectTarget(path = "/account") {
    const url = new URL(path, "http://internal");
    // any page can be the target, which the route types can't know
    return {
        to: url.pathname,
        search: Object.fromEntries(url.searchParams),
        hash: url.hash.slice(1),
    } as unknown as { to: "/account" };
}

/**
 * For the login and signup pages: signed in users are sent to their account, or to the login's `redirect`.
 * That's also how signing in ends: Better Auth reloads the login page once the session is there.
 */
export async function requireGuest({ context, search }: Pick<GuardOptions, "context"> & { search: { redirect?: string } }) {
    if (await context.queryClient.fetchQuery(sessionQuery)) {
        throw redirect(redirectTarget(search.redirect));
    }
}
