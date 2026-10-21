import { m } from "@shared/paraglide/messages";
import { Link, getRouteApi, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRef, useState } from "react";
import { authClient, authErrorMessage } from "@client/auth";
import { SplitCard, SplitCardHeader } from "../cards/split";
import ReceiveNotification2 from "../illustrations/receive-notification-2.svg?react";
import { Rich } from "../rich";
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
import { FormMessage, SubmitButton } from "./form-parts";
import { useFormSubmit } from "@/hooks/form";
import { redirectTarget, sessionQuery } from "@/functions/auth";

const route = getRouteApi("/account/_auth/login");

/** Better Auth's two factor plugin sends 6 digit email codes by default. */
const codeLength = 6;
const half = codeLength / 2;

/** The code's digits in two groups of three. */
function CodeInput(props: { value: string; onChange: (value: string) => void; onComplete: () => void }) {
    const slots = (start: number) => Array.from({ length: half }, (_, index) => (
        <InputOTPSlot key={index} index={start + index} className="size-11 text-md-3" />
    ));

    return (
        <InputOTP
            id="code"
            name="code"
            value={props.value}
            onChange={props.onChange}
            onComplete={props.onComplete}
            maxLength={codeLength}
            pattern={REGEXP_ONLY_DIGITS}
            autoComplete="one-time-code"
            containerClassName="justify-center"
            autoFocus
            required
        >
            <InputOTPGroup>{slots(0)}</InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>{slots(half)}</InputOTPGroup>
        </InputOTP>
    );
}

/** The second step of signing in, after the login form sent the code. */
export function VerifyForm() {
    const { redirect } = route.useSearch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const form = useRef<HTMLFormElement>(null);
    const [code, setCode] = useState("");
    const [resent, setResent] = useState(false);

    const { onSubmit, pending, error, setError } = useFormSubmit(async (field) => {
        const { error: failed } = await authClient.twoFactor.verifyOtp({
            code,
            trustDevice: field("trustDevice") === "on",
        });

        if (failed) {
            // ready for the next try
            setCode("");
            return authErrorMessage(failed);
        }
        queryClient.removeQueries({ queryKey: sessionQuery.queryKey });
        await navigate(redirectTarget(redirect));
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
                    <SplitCardHeader title={m.verify_title()} description={m.verify_description({ length: codeLength })} />
                    <Field>
                        <FieldLabel htmlFor="code" className="sr-only">{m.verify_code()}</FieldLabel>
                        {/* sent as soon as the last digit is in */}
                        <CodeInput value={code} onChange={setCode} onComplete={() => form.current?.requestSubmit()} />
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
                        <Link to="/account/login" search={{ redirect }}>{m.common_back_to_login()}</Link>
                    </FieldDescription>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
