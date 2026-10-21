import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { nameFromEmail } from "@shared/auth";
import { authClient, usePublicUrl } from "@client/auth";
import { SplitCard } from "../cards/split";
import CreateAccount1 from "../illustrations/create-account-1.svg?react";
import { LegalAgreement } from "../legal";
import { Rich } from "../rich";
import { RecaptchaNotice } from "../recaptcha-notice";
import { SocialLogin } from "../social-login";
import { TextH1, TextP } from "../typography";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { EmailSent, FormMessage, SubmitButton, authErrorMessage, field, useAuthForm } from "./auth";

export function SignupForm() {
    const publicUrl = usePublicUrl();
    /** the address the confirmation link went to */
    const [sent, setSent] = useState<string>();

    const { onSubmit, pending, error } = useAuthForm(async (fields) => {
        const email = field(fields, "email").trim();
        const password = field(fields, "password");

        if (password !== field(fields, "confirmPassword")) {
            return m.auth_error_password_mismatch();
        }

        // an address that already has an account gets the same answer, so nobody can find out who has one
        const { error: failed } = await authClient.signUp.email({
            email,
            password,
            // the server sets it too, the client just needs one
            name: nameFromEmail(email),
            callbackURL: publicUrl({ to: "/account/login", search: { notice: "verified" } }),
        });

        if (failed) {
            return authErrorMessage(failed);
        }
        setSent(email);
    });

    return (
        <SplitCard
            aside={<CreateAccount1 aria-hidden className="w-full max-w-xs h-auto" />}
            footer={<LegalAgreement message={m.legal_agree_signup} />}
        >
            {
                sent ? <EmailSent>{m.signup_sent({ email: sent })}</EmailSent> : (
            <form method="post" onSubmit={onSubmit}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <TextH1 size="md-2">{m.signup_title()}</TextH1>
                        <TextP variant="muted" className="text-balance">
                            {m.signup_description()}
                        </TextP>
                    </div>
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
                    <Field>
                        <FieldLabel htmlFor="password">{m.common_password()}</FieldLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                        <FieldDescription>{m.common_password_hint()}</FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="confirm-password">{m.common_password_confirm()}</FieldLabel>
                        <Input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                    </Field>
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
                )
            }
        </SplitCard>
    );
}
