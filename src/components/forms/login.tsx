import { m } from "@shared/paraglide/messages";
import { Link, getRouteApi, useNavigate } from "@tanstack/react-router";
import { authClient, authErrorMessage } from "@client/auth";
import { SplitCard, SplitCardHeader } from "../cards/split";
import EnterPassword5 from "../illustrations/enter-password-5.svg?react";
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
import { Switch } from "../ui/switch";
import { FormMessage, SubmitButton } from "./form-parts";
import { useAuthForm, usePublicUrl } from "@/hooks/auth";

const route = getRouteApi("/account/_auth/login");

export function LoginForm() {
    const { redirect } = route.useSearch();
    const navigate = useNavigate();
    const publicUrl = usePublicUrl();

    const { onSubmit, pending, error } = useAuthForm(async (field) => {
        const { data, error: failed } = await authClient.signIn.email({
            email: field("email").trim(),
            password: field("password"),
            rememberMe: field("rememberMe") === "on",
            // where the new confirmation link leads when the email isn't confirmed yet; Better Auth also opens it
            // right after signing in, and the page sends signed in visitors on to `redirect`
            callbackURL: publicUrl({ to: "/account/status/$status", params: { status: "email-verified" }, search: { redirect } }),
        });

        if (failed) {
            return authErrorMessage(failed);
        }
        if ("twoFactorRedirect" in data && data.twoFactorRedirect) {
            const sent = await authClient.twoFactor.sendOtp();
            if (sent.error) {
                return authErrorMessage(sent.error);
            }
            await navigate({ to: "/account/login/verify", search: { redirect } });
        }
    });

    return (
        <SplitCard
            aside={<EnterPassword5 aria-hidden className="w-full max-w-xs h-auto" />}
            footer={<LegalAgreement message={m.legal_agree_login} />}
        >
            <form method="post" onSubmit={onSubmit}>
                <FieldGroup>
                    <SplitCardHeader title={m.login_title()} description={m.login_description()} />
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
