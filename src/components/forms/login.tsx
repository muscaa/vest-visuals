import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { SplitCard } from "../cards/split";
import EnterPassword5 from "../illustrations/enter-password-5.svg?react";
import { LegalAgreement } from "../legal";
import { Rich } from "../rich";
import { RecaptchaNotice } from "../recaptcha-notice";
import { SocialLogin } from "../social-login";
import { TextH1, TextP } from "../typography";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";

export function LoginForm() {
    return (
        <SplitCard
            aside={<EnterPassword5 aria-hidden className="w-full max-w-xs h-auto" />}
            footer={<LegalAgreement message={m.legal_agree_login} />}
        >
            <form>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <TextH1 size="md-2">{m.login_title()}</TextH1>
                        <TextP variant="muted" className="text-balance">
                            {m.login_description()}
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
                        <div className="flex items-center">
                            <FieldLabel htmlFor="password">{m.common_password()}</FieldLabel>
                            <Link
                                to="/account/forgot-password"
                                className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline"
                            >
                                {m.login_forgot()}
                            </Link>
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                        />
                    </Field>
                    <Field orientation="horizontal">
                        <Checkbox id="remember-me" name="rememberMe" defaultChecked />
                        <FieldLabel htmlFor="remember-me" className="font-normal">
                            {m.login_remember()}
                        </FieldLabel>
                    </Field>
                    <Field>
                        <Button type="submit" size="lg">
                            {m.login_submit()}
                        </Button>
                        <RecaptchaNotice />
                    </Field>
                    <FieldDescription className="text-center">
                        <Rich message={m.login_no_account} tags={{ signup: ({ children }) => <Link to="/account/signup">{children}</Link> }} />
                    </FieldDescription>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
