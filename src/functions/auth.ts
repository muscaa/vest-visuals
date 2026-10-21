import { auth } from "@server/auth";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";
import { isAdmin } from "@shared/auth";

/** The signed in user's session, or null. */
export const getSession = createServerFn({ method: "GET" }).handler(async () => {
    return await auth.api.getSession({ headers: getRequestHeaders() });
});

/**
 * The signed in user's session; signed out visitors are sent to the login page.
 * For a route: `beforeLoad: async () => ({ session: await requireSession() })`.
 */
export const requireSession = createServerFn({ method: "GET" }).handler(async () => {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });

    if (!session) {
        throw redirect({ to: "/account/login" });
    }

    return session;
});

/** Like {@link requireSession}, but only for admins; other users are sent to their account. */
export const requireAdmin = createServerFn({ method: "GET" }).handler(async () => {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });

    if (!session) {
        throw redirect({ to: "/account/login" });
    }
    if (!isAdmin(session.user)) {
        throw redirect({ to: "/account" });
    }

    return session;
});

export const signout = createServerFn({ method: "POST" }).handler(async () => {
    await auth.api.signOut({ headers: getRequestHeaders() });
});
