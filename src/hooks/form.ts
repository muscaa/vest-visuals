import { m } from "@shared/paraglide/messages";
import { useState } from "react";

/** A submitted field, as typed (passwords can start or end with spaces); "" when missing, "on" for a checked switch. */
export type FieldReader = (name: string) => string;

/**
 * Submitting a form from code: reads its fields, keeps the button busy and shows what went wrong.
 * `submit` returns an error message, or nothing when it worked.
 */
export function useFormSubmit(submit: (field: FieldReader) => Promise<string | void>) {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
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
