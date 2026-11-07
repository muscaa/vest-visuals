import { auth } from "@server/auth";
import { isAdmin } from "@shared/auth";
import { queryOptions } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { db } from "@server/db";
import { user } from "@server/db/schema";
import { cookieName, locales } from "@shared/paraglide/runtime";
import type { Locale } from "@shared/paraglide/runtime";
import type { QueryClient } from "@tanstack/react-query";
import type { ParsedLocation } from "@tanstack/react-router";

/**
 * The signed in user's session, or null. Their language is kept up to date on the way, from the one they browse in,
 * for the emails they get: every page asks for the session, picking a language reloads the page.
 */
export const getSession = createServerFn({ method: "GET" }).handler(async () => {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });

    const locale = getCookie(cookieName) as Locale | undefined;
    if (session && locale && locales.includes(locale) && session.user.locale !== locale) {
        await db.update(user).set({ locale }).where(eq(user.id, session.user.id));
    }
    return session;
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

//
// guards, for `beforeLoad`
//

interface GuardOptions {
    context: { queryClient: QueryClient };
    location: ParsedLocation;
}

async function sessionOrLogin({ context, location }: GuardOptions) {
    const session = await context.queryClient.query(sessionQuery);

    if (!session) {
        // back to this page after signing in
        throw redirect({ to: "/account/login", search: { redirect: location.href } });
    }

    return session;
}

/** Pages of signed in users; signed out visitors are sent to the login page. */
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

/** The login, signup and forgot password pages; signed in users go on to their account, or the login's `redirect`. */
export async function requireGuest({ context, search }: Pick<GuardOptions, "context"> & { search: { redirect?: string } }) {
    if (await context.queryClient.query(sessionQuery)) {
        throw redirect(redirectTarget(search.redirect));
    }
}

//
// middleware, for server functions working with private data
//

/** Only for signed in users, who are then in the context as `user`. */
export const sessionMiddleware = createMiddleware({ type: "function" }).server(async ({ next }) => {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });
    if (!session) {
        throw new Error("Not signed in");
    }
    return next({ context: { user: session.user } });
});

/** Like {@link sessionMiddleware}, but only for admins. */
export const adminMiddleware = createMiddleware({ type: "function" })
    .middleware([sessionMiddleware])
    .server(async ({ next, context }) => {
        if (!isAdmin(context.user)) {
            throw new Error("Not an admin");
        }
        return next();
    });
