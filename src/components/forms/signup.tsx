import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { SplitCard } from "../cards/split";
import CreateAccount1 from "../illustrations/create-account-1.svg?react";
import { LegalAgreement } from "../legal";
import { Rich } from "../rich";
import { RecaptchaNotice } from "../recaptcha-notice";
import { SocialLogin } from "../social-login";
import { TextH1, TextP } from "../typography";
import { Button } from "../ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";

export function SignupForm() {
    return (
        <SplitCard
            aside={<CreateAccount1 aria-hidden className="w-full max-w-xs h-auto" />}
            footer={<LegalAgreement message={m.legal_agree_signup} />}
        >
            <form>
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
                        <Button type="submit" size="lg">
                            {m.signup_submit()}
                        </Button>
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
