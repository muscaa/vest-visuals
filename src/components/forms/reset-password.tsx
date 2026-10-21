import { m } from "@shared/paraglide/messages";
import { Link, getRouteApi, useNavigate } from "@tanstack/react-router";
import { authClient, authErrorMessage } from "@client/auth";
import { SplitCard, SplitCardHeader } from "../cards/split";
import ResetPassword2 from "../illustrations/reset-password-2.svg?react";
import { Field, FieldDescription, FieldGroup } from "../ui/field";
import { FormMessage, NewPasswordFields, SubmitButton, passwordsMatch } from "./form-parts";
import { useFormSubmit } from "@/hooks/form";

const route = getRouteApi("/account/_auth/reset-password/");

/** Where the reset link from the email lands; the route sends invalid links to their status page. */
export function ResetPasswordForm() {
    const { token } = route.useSearch();
    const navigate = useNavigate();

    const { onSubmit, pending, error } = useFormSubmit(async (field) => {
        if (!passwordsMatch(field)) {
            return m.auth_error_password_mismatch();
        }

        const { error: failed } = await authClient.resetPassword({ newPassword: field("password"), token });

        if (failed) {
            return authErrorMessage(failed);
        }
        await navigate({ to: "/account/status/$status", params: { status: "password-changed" } });
    });

    return (
        <SplitCard
            aside={<ResetPassword2 aria-hidden className="w-full max-w-xs h-auto" />}
        >
            <form method="post" onSubmit={onSubmit}>
                <FieldGroup>
                    <SplitCardHeader title={m.reset_title()} description={m.reset_description()} />
                    <NewPasswordFields label={m.reset_password()} />
                    <Field>
                        {error && <FormMessage>{error}</FormMessage>}
                        <SubmitButton pending={pending}>{m.reset_submit()}</SubmitButton>
                    </Field>
                    <FieldDescription className="text-center">
                        <Link to="/account/login">{m.common_back_to_login()}</Link>
                    </FieldDescription>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
