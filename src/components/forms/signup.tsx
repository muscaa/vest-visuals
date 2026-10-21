import { m } from "@shared/paraglide/messages";
import { Link, useNavigate } from "@tanstack/react-router";
import { nameFromEmail } from "@shared/auth";
import { authClient, authErrorMessage } from "@client/auth";
import { SplitCard, SplitCardHeader } from "../cards/split";
import CreateAccount1 from "../illustrations/create-account-1.svg?react";
import { LegalAgreement } from "../legal";
import { Rich } from "../rich";
import { RecaptchaNotice } from "../recaptcha-notice";
import { SocialLogin } from "../social-login";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { FormMessage, NewPasswordFields, SubmitButton, passwordsMatch } from "./form-parts";
import { usePublicUrl } from "@/hooks/auth";
import { useFormSubmit } from "@/hooks/form";

export function SignupForm() {
    const navigate = useNavigate();
    const publicUrl = usePublicUrl();

    const { onSubmit, pending, error } = useFormSubmit(async (field) => {
        if (!passwordsMatch(field)) {
            return m.auth_error_password_mismatch();
        }

        const email = field("email").trim();
        // an address that already has an account gets the same answer, so nobody can find out who has one
        const { error: failed } = await authClient.signUp.email({
            email,
            password: field("password"),
            // the server sets it too, the client just needs one
            name: nameFromEmail(email),
            callbackURL: publicUrl({ to: "/account/status/$status", params: { status: "email-verified" } }),
        });

        if (failed) {
            return authErrorMessage(failed);
        }
        await navigate({ to: "/account/status/$status", params: { status: "signup" }, search: { email } });
    });

    return (
        <SplitCard
            aside={<CreateAccount1 aria-hidden className="w-full max-w-xs h-auto" />}
            footer={<LegalAgreement message={m.legal_agree_signup} />}
        >
            <form method="post" onSubmit={onSubmit}>
                <FieldGroup>
                    <SplitCardHeader title={m.signup_title()} description={m.signup_description()} />
                    <SocialLogin />
                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                        {m.auth_or_email()}
                    </FieldSeparator>
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
                    <NewPasswordFields />
                    <Field>
                        {error && <FormMessage>{error}</FormMessage>}
                        <SubmitButton pending={pending}>{m.signup_submit()}</SubmitButton>
                        <RecaptchaNotice />
                    </Field>
                    <FieldDescription className="text-center">
                        <Rich message={m.signup_has_account} tags={{ login: ({ children }) => <Link to="/account/login">{children}</Link> }} />
                    </FieldDescription>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
