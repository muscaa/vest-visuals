import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { authClient, usePublicUrl } from "@client/auth";
import { Rich } from "../rich";
import { SplitCard } from "../cards/split";
import ResetPassword6 from "../illustrations/reset-password-6.svg?react";
import { RecaptchaNotice } from "../recaptcha-notice";
import { TextH1, TextP } from "../typography";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { EmailSent, FormMessage, SubmitButton, authErrorMessage, field, useAuthForm } from "./auth";

export function ForgotPasswordForm() {
    const publicUrl = usePublicUrl();
    /** the address the link went to */
    const [sent, setSent] = useState<string>();

    const { onSubmit, pending, error } = useAuthForm(async (fields) => {
        const email = field(fields, "email").trim();
        // same answer whether the account exists or not
        const { error: failed } = await authClient.requestPasswordReset({
            email,
            redirectTo: publicUrl({ to: "/account/reset-password" }),
        });

        if (failed) {
            return authErrorMessage(failed);
        }
        setSent(email);
    });

    return (
        <SplitCard
            aside={<ResetPassword6 aria-hidden className="w-full max-w-xs h-auto" />}
        >
            {
                sent ? <EmailSent>{m.forgot_sent({ email: sent })}</EmailSent> : (
            <form method="post" onSubmit={onSubmit}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <TextH1 size="md-2">{m.forgot_title()}</TextH1>
                        <TextP variant="muted" className="text-balance">
                            {m.forgot_description()}
                        </TextP>
                    </div>
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
                )
            }
        </SplitCard>
    );
}
