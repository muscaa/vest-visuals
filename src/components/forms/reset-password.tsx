import { m } from "@shared/paraglide/messages";
import { Link, getRouteApi, useNavigate } from "@tanstack/react-router";
import { authClient } from "@client/auth";
import { SplitCard } from "../cards/split";
import ResetPassword2 from "../illustrations/reset-password-2.svg?react";
import { TextH1, TextP } from "../typography";
import { buttonVariants } from "../ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { FormMessage, SubmitButton, authErrorMessage, field, useAuthForm } from "./auth";

const route = getRouteApi("/account/reset-password");

/** Where the reset link from the email lands. */
export function ResetPasswordForm() {
    const { token, error: linkError } = route.useSearch();
    const navigate = useNavigate();

    const { onSubmit, pending, error } = useAuthForm(async (fields) => {
        const password = field(fields, "password");

        if (password !== field(fields, "confirmPassword")) {
            return m.auth_error_password_mismatch();
        }

        const { error: failed } = await authClient.resetPassword({ newPassword: password, token });

        if (failed) {
            return authErrorMessage(failed);
        }
        await navigate({ to: "/account/login", search: { notice: "reset" } });
    });

    if (!token || linkError) {
        return (
            <SplitCard
                aside={<ResetPassword2 aria-hidden className="w-full max-w-xs h-auto" />}
            >
                <div className="flex flex-col items-center gap-6 text-center">
                    <TextH1 size="md-2">{m.reset_title()}</TextH1>
                    <FormMessage className="w-full">{authErrorMessage(linkError ?? "INVALID_TOKEN")}</FormMessage>
                    <Link to="/account/forgot-password" className={buttonVariants({ variant: "outline", size: "lg" })}>
                        {m.reset_request_new()}
                    </Link>
                </div>
            </SplitCard>
        );
    }

    return (
        <SplitCard
            aside={<ResetPassword2 aria-hidden className="w-full max-w-xs h-auto" />}
        >
            <form method="post" onSubmit={onSubmit}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <TextH1 size="md-2">{m.reset_title()}</TextH1>
                        <TextP variant="muted" className="text-balance">
                            {m.reset_description()}
                        </TextP>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="password">{m.reset_password()}</FieldLabel>
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
