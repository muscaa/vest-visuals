import { m } from "@shared/paraglide/messages";
import { Link, getRouteApi, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRef, useState } from "react";
import { authClient } from "@client/auth";
import { Rich } from "../rich";
import { SplitCard } from "../cards/split";
import ReceiveNotification2 from "../illustrations/receive-notification-2.svg?react";
import { TextH1, TextP } from "../typography";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "../ui/field";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "../ui/input-otp";
import { Switch } from "../ui/switch";
import { FormMessage, SubmitButton, authErrorMessage, field, useAuthForm } from "./auth";
import { redirectTarget, sessionQuery } from "@/functions/auth";

const route = getRouteApi("/account/login");

/** Better Auth's two factor plugin sends 6 digit email codes by default. */
const codeLength = 6;
const half = codeLength / 2;

/** The second step of signing in, after the login form sent the code. */
export function VerifyForm() {
    const search = route.useSearch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [resent, setResent] = useState(false);
    const [code, setCode] = useState("");
    const form = useRef<HTMLFormElement>(null);

    const { onSubmit, pending, error, setError } = useAuthForm(async (fields) => {
        const { error: failed } = await authClient.twoFactor.verifyOtp({
            code: field(fields, "code"),
            trustDevice: fields.get("trustDevice") === "on",
        });

        if (failed) {
            // ready for the next try
            setCode("");
            return authErrorMessage(failed);
        }
        queryClient.removeQueries({ queryKey: sessionQuery.queryKey });
        await navigate(redirectTarget(search.redirect));
    });

    const resend = async () => {
        setResent(false);
        setError(undefined);
        const { error: failed } = await authClient.twoFactor.sendOtp();
        if (failed) {
            setError(authErrorMessage(failed));
        } else {
            setResent(true);
        }
    };

    return (
        <SplitCard
            aside={<ReceiveNotification2 aria-hidden className="w-full max-w-xs h-auto" />}
        >
            <form ref={form} method="post" onSubmit={onSubmit}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <TextH1 size="md-2">{m.verify_title()}</TextH1>
                        <TextP variant="muted" className="text-balance">
                            {m.verify_description({ length: codeLength })}
                        </TextP>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="code" className="sr-only">{m.verify_code()}</FieldLabel>
                        <InputOTP
                            id="code"
                            name="code"
                            value={code}
                            onChange={setCode}
                            maxLength={codeLength}
                            pattern={REGEXP_ONLY_DIGITS}
                            autoComplete="one-time-code"
                            containerClassName="justify-center"
                            // sent as soon as the last digit is in
                            onComplete={() => form.current?.requestSubmit()}
                            autoFocus
                            required
                        >
                            <InputOTPGroup>
                                {
                                    Array.from({ length: half }).map((_, index) => (
                                        <InputOTPSlot key={index} index={index} className="size-11 text-md-3" />
                                    ))
                                }
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                {
                                    Array.from({ length: half }).map((_, index) => (
                                        <InputOTPSlot key={index} index={half + index} className="size-11 text-md-3" />
                                    ))
                                }
                            </InputOTPGroup>
                        </InputOTP>
                    </Field>
                    <Field orientation="horizontal" className="justify-between">
                        <FieldLabel htmlFor="trust-device" className="font-normal">
                            {m.verify_trust()}
                        </FieldLabel>
                        <Switch id="trust-device" name="trustDevice" />
                    </Field>
                    <Field>
                        {error && <FormMessage>{error}</FormMessage>}
                        {!error && resent && <FormMessage variant="success">{m.verify_resent()}</FormMessage>}
                        <SubmitButton pending={pending}>{m.verify_submit()}</SubmitButton>
                    </Field>
                    <FieldDescription className="text-center">
                        <Rich
                            message={m.verify_resend}
                            tags={{ resend: ({ children }) => <button type="button" onClick={resend} className="underline underline-offset-4 hover:text-primary">{children}</button> }}
                        />
                    </FieldDescription>
                    <FieldDescription className="text-center">
                        <Link to="/account/login" search={{ redirect: search.redirect }}>{m.common_back_to_login()}</Link>
                    </FieldDescription>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
