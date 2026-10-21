import { m } from "@shared/paraglide/messages";
import { Link, getRouteApi, useNavigate } from "@tanstack/react-router";
import { authClient, usePublicUrl } from "@client/auth";
import { SplitCard } from "../cards/split";
import EnterPassword5 from "../illustrations/enter-password-5.svg?react";
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
import { Switch } from "../ui/switch";
import { FormMessage, SubmitButton, authErrorMessage, field, useAuthForm } from "./auth";

const route = getRouteApi("/account/login");

const notices = {
    verified: m.login_notice_verified,
    reset: m.login_notice_reset,
    deleted: m.login_notice_deleted,
};

export function LoginForm() {
    const search = route.useSearch();
    const navigate = useNavigate();
    const publicUrl = usePublicUrl();

    const { onSubmit, pending, error } = useAuthForm(async (fields) => {
        const { data, error: failed } = await authClient.signIn.email({
            email: field(fields, "email").trim(),
            password: field(fields, "password"),
            rememberMe: fields.get("rememberMe") === "on",
            // the client reloads it once signed in, then the page's guard continues to `redirect`;
            // also where the new verification link leads, when the email isn't confirmed yet
            callbackURL: publicUrl({ to: "/account/login", search: { notice: "verified", redirect: search.redirect } }),
        });

        if (failed) {
            return authErrorMessage(failed);
        }
        if ("twoFactorRedirect" in data && data.twoFactorRedirect) {
            const sent = await authClient.twoFactor.sendOtp();
            if (sent.error) {
                return authErrorMessage(sent.error);
            }
            await navigate({ to: "/account/login/verify", search: { redirect: search.redirect } });
        }
    });

    // an email link that didn't work wins over its notice
    const notice = search.error
        ? <FormMessage>{authErrorMessage(search.error)}</FormMessage>
        : search.notice && <FormMessage variant="success">{notices[search.notice]()}</FormMessage>;

    return (
        <SplitCard
            aside={<EnterPassword5 aria-hidden className="w-full max-w-xs h-auto" />}
            footer={<LegalAgreement message={m.legal_agree_login} />}
        >
            <form method="post" onSubmit={onSubmit}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <TextH1 size="md-2">{m.login_title()}</TextH1>
                        <TextP variant="muted" className="text-balance">
                            {m.login_description()}
                        </TextP>
                    </div>
                    {notice}
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
                    <Field orientation="horizontal" className="justify-between">
                        <FieldLabel htmlFor="remember-me" className="font-normal">
                            {m.login_remember()}
                        </FieldLabel>
                        <Switch id="remember-me" name="rememberMe" defaultChecked />
                    </Field>
                    <Field>
                        {error && <FormMessage>{error}</FormMessage>}
                        <SubmitButton pending={pending}>{m.login_submit()}</SubmitButton>
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
