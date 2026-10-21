import { m } from "@shared/paraglide/messages";
import { Link, useNavigate } from "@tanstack/react-router";
import { authClient, authErrorMessage } from "@client/auth";
import { SplitCard, SplitCardHeader } from "../cards/split";
import ResetPassword6 from "../illustrations/reset-password-6.svg?react";
import { Rich } from "../rich";
import { RecaptchaNotice } from "../recaptcha-notice";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { FormMessage, SubmitButton } from "./form-parts";
import { usePublicUrl } from "@/hooks/auth";
import { useFormSubmit } from "@/hooks/form";

export function ForgotPasswordForm() {
    const navigate = useNavigate();
    const publicUrl = usePublicUrl();

    const { onSubmit, pending, error } = useFormSubmit(async (field) => {
        const email = field("email").trim();
        // same answer whether the account exists or not
        const { error: failed } = await authClient.requestPasswordReset({
            email,
            redirectTo: publicUrl({ to: "/account/reset-password" }),
        });

        if (failed) {
            return authErrorMessage(failed);
        }
        await navigate({ to: "/account/status/$status", params: { status: "password-requested" }, search: { email } });
    });

    return (
        <SplitCard
            aside={<ResetPassword6 aria-hidden className="w-full max-w-xs h-auto" />}
        >
            <form method="post" onSubmit={onSubmit}>
                <FieldGroup>
                    <SplitCardHeader title={m.forgot_title()} description={m.forgot_description()} />
                    <Field>
                        <FieldLabel htmlFor="email">{m.common_email()}</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder={m.common_email_placeholder()}
                            required
                        />
                    </Field>
                    <Field>
                        {error && <FormMessage>{error}</FormMessage>}
                        <SubmitButton pending={pending}>{m.forgot_submit()}</SubmitButton>
                        <RecaptchaNotice />
                    </Field>
                    <FieldDescription className="text-center">
                        <Rich message={m.forgot_remembered} tags={{ login: ({ children }) => <Link to="/account/login">{children}</Link> }} />
                    </FieldDescription>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
