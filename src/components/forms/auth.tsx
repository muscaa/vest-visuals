import { cn } from "@shared/shadcn/utils";
import { m } from "@shared/paraglide/messages";
import { Link, useHydrated } from "@tanstack/react-router";
import { useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { TextH1, TextP } from "../typography";
import { Button, buttonVariants } from "../ui/button";

/** Better Auth error codes, see `BASE_ERROR_CODES` and the two factor plugin's codes. Others get a generic message. */
const errorMessages: Record<string, () => string> = {
    INVALID_EMAIL_OR_PASSWORD: m.auth_error_credentials,
    EMAIL_NOT_VERIFIED: m.auth_error_email_not_verified,
    INVALID_EMAIL: m.auth_error_email_invalid,
    PASSWORD_TOO_SHORT: m.auth_error_password_length,
    PASSWORD_TOO_LONG: m.auth_error_password_length,
    INVALID_PASSWORD: m.auth_error_password_wrong,
    USER_ALREADY_EXISTS: m.auth_error_email_taken,
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: m.auth_error_email_taken,
    INVALID_TOKEN: m.auth_error_link,
    TOKEN_EXPIRED: m.auth_error_link,
    USER_NOT_FOUND: m.auth_error_link,
    INVALID_USER: m.auth_error_link,
    INVALID_CODE: m.auth_error_code,
    OTP_HAS_EXPIRED: m.auth_error_code_expired,
    TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: m.auth_error_code_attempts,
    ACCOUNT_TEMPORARILY_LOCKED: m.auth_error_locked,
    INVALID_TWO_FACTOR_COOKIE: m.auth_error_sign_in_expired,
};

/** A message for an error from the auth client, or for the `error` Better Auth adds to its redirects. */
export function authErrorMessage(error: { code?: string; status?: number } | string | null | undefined) {
    const value = typeof error === "string" ? { code: error } : error;

    if (value?.status === 429) {
        return m.auth_error_rate_limit();
    }

    return (value?.code && errorMessages[value.code]?.()) || m.auth_error_generic();
}

/**
 * Submitting an auth form: reads its fields, keeps the button busy and shows what went wrong.
 * `submit` returns an error message, or nothing when it worked.
 */
export function useAuthForm(submit: (fields: FormData) => Promise<string | undefined | void>) {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (pending) return;

        const fields = new FormData(event.currentTarget);
        setPending(true);
        setError(undefined);
        try {
            setError((await submit(fields)) ?? undefined);
        } catch {
            setError(m.auth_error_generic());
        } finally {
            setPending(false);
        }
    };

    return { onSubmit, pending, error, setError };
}

/** Reads a text field of a submitted form, as typed (passwords can start or end with spaces). */
export function field(fields: FormData, name: string) {
    const value = fields.get(name);
    return typeof value === "string" ? value : "";
}

/** A notice above or inside a form: what went wrong, or what happened. */
export function FormMessage(props: { variant?: "error" | "success"; children: React.ReactNode; className?: string }) {
    const error = props.variant !== "success";

    return (
        <div
            role={error ? "alert" : "status"}
            className={cn(
                "rounded-lg px-4 py-3 text-sm text-center text-balance",
                error ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary",
                props.className,
            )}
        >
            {props.children}
        </div>
    );
}

/**
 * The form's main button, busy while it's sent. Disabled until the page is interactive, otherwise the browser
 * would send the form itself; the forms also use `method="post"`, so the fields never end up in the url.
 */
export function SubmitButton(props: { pending: boolean; children: React.ReactNode; size?: "default" | "lg" }) {
    const hydrated = useHydrated();

    return (
        <Button type="submit" size={props.size ?? "lg"} disabled={!hydrated || props.pending} aria-busy={props.pending}>
            {props.pending && <IconLoader2 data-icon="inline-start" className="animate-spin" />}
            {props.children}
        </Button>
    );
}

/** Shown in place of a form that sent an email (signup, forgot password). */
export function EmailSent(props: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
                <TextH1 size="md-2">{m.verify_title()}</TextH1>
                <TextP variant="muted" className="text-balance">
                    {props.children}
                </TextP>
            </div>
            <Link to="/account/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
                {m.common_back_to_login()}
            </Link>
        </div>
    );
}
