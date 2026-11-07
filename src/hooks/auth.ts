import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { authClient, authErrorMessage } from "@client/auth";
import type { RegisteredRouter, ToOptions } from "@tanstack/react-router";
import { sessionQuery } from "@/functions/auth";

/** The signed in user, for pages behind `requireSession`. After changing the account, refresh it with {@link useRefreshUser}. */
export function useUser() {
    const { data } = useSuspenseQuery(sessionQuery);

    if (!data) {
        throw new Error("useUser is only for pages behind requireSession");
    }

    return data.user;
}

/** Refreshes the signed in user everywhere (sidebar, settings) after changing the account. */
export function useRefreshUser() {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: sessionQuery.queryKey });
}

/**
 * Full url of a page as visitors see it (`https://account.…/ro/autentificare`), for the links in auth emails
 * and full page loads. Only in the browser, from event handlers.
 */
export function usePublicUrl() {
    const router = useRouter();

    return <const TTo extends string>(options: ToOptions<RegisteredRouter, "/", TTo>) => {
        const location = router.buildLocation(options as Parameters<typeof router.buildLocation>[0]);
        return new URL(location.publicHref, window.location.origin).href;
    };
}

/**
 * Signs out, then loads the login page from scratch, so nothing of the account stays in memory.
 * If signing out fails, the page stays, so it never looks signed out while the session is still there.
 */
export function useSignOut() {
    const publicUrl = usePublicUrl();

    return async () => {
        const { error } = await authClient.signOut();
        if (error) {
            toast.error(authErrorMessage(error));
            return;
        }
        window.location.assign(publicUrl({ to: "/account/login" }));
    };
}
