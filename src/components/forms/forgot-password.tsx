import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { Rich } from "../rich";
import { SplitCard } from "../cards/split";
import ResetPassword6 from "../illustrations/reset-password-6.svg?react";
import { RecaptchaNotice } from "../recaptcha-notice";
import { TextH1, TextP } from "../typography";
import { Button } from "../ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";

export function ForgotPasswordForm() {
    return (
        <SplitCard
            aside={<ResetPassword6 aria-hidden className="w-full max-w-xs h-auto" />}
        >
            <form>
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
                        <Button type="submit" size="lg">
                            {m.forgot_submit()}
                        </Button>
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
