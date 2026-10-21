import { cn } from "@shared/shadcn/utils";
import { m } from "@shared/paraglide/messages";
import { useHydrated } from "@tanstack/react-router";
import { IconLoader2 } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

/** What went wrong with a form, or what happened, shown above its button. */
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

export interface SubmitButtonProps extends Pick<React.ComponentProps<typeof Button>, "size" | "variant"> {
    pending: boolean;
    children: React.ReactNode;
}

/**
 * The form's button, busy while it's sent. Disabled until the page is interactive, otherwise the browser would
 * send the form itself; the forms also use `method="post"`, so the fields never end up in the url.
 */
export function SubmitButton({ pending, children, size = "lg", variant }: SubmitButtonProps) {
    const hydrated = useHydrated();

    return (
        <Button type="submit" size={size} variant={variant} disabled={!hydrated || pending} aria-busy={pending}>
            {pending && <IconLoader2 data-icon="inline-start" className="animate-spin" />}
            {children}
        </Button>
    );
}

/** A new password and its confirmation, read as `password` and `confirmPassword`; compare them with {@link passwordsMatch}. */
export function NewPasswordFields(props: { label?: string }) {
    return (
        <>
            <Field>
                <FieldLabel htmlFor="password">{props.label ?? m.common_password()}</FieldLabel>
                <Input id="password" name="password" type="password" autoComplete="new-password" minLength={8} maxLength={128} required />
                <FieldDescription>{m.common_password_hint()}</FieldDescription>
            </Field>
            <Field>
                <FieldLabel htmlFor="confirm-password">{m.common_password_confirm()}</FieldLabel>
                <Input id="confirm-password" name="confirmPassword" type="password" autoComplete="new-password" required />
            </Field>
        </>
    );
}

/** Whether the {@link NewPasswordFields} match. */
export function passwordsMatch(field: (name: string) => string) {
    return field("password") === field("confirmPassword");
}
