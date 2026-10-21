import { m } from "@shared/paraglide/messages";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "@client/auth";
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

/** Signs out, then loads the login page from scratch, so nothing of the account stays in memory. */
export function useSignOut() {
    const publicUrl = usePublicUrl();

    return async () => {
        await authClient.signOut();
        window.location.assign(publicUrl({ to: "/account/login" }));
    };
}

/** A submitted field, as typed (passwords can start or end with spaces); "" when missing, "on" for a checked switch. */
export type FieldReader = (name: string) => string;

/**
 * Submitting a form that talks to Better Auth: keeps the button busy and shows what went wrong.
 * `submit` returns an error message, or nothing when it worked.
 */
export function useAuthForm(submit: (field: FieldReader) => Promise<string | void>) {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (pending) return;

        const fields = new FormData(event.currentTarget);
        const field: FieldReader = (name) => {
            const value = fields.get(name);
            return typeof value === "string" ? value : "";
        };

        setPending(true);
        setError(undefined);
        try {
            setError((await submit(field)) ?? undefined);
        } catch {
            setError(m.auth_error_generic());
        } finally {
            setPending(false);
        }
    };

    return { onSubmit, pending, error, setError };
}
