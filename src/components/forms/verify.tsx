import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Rich } from "../rich";
import { SplitCard } from "../cards/split";
import ReceiveNotification2 from "../illustrations/receive-notification-2.svg?react";
import { TextH1, TextP } from "../typography";
import { Button } from "../ui/button";
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

/** Better Auth's two factor plugin sends 6 digit email codes by default. */
const codeLength = 6;
const half = codeLength / 2;

export function VerifyForm() {
    return (
        <SplitCard
            aside={<ReceiveNotification2 aria-hidden className="w-full max-w-xs h-auto" />}
        >
            <form>
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
                            maxLength={codeLength}
                            pattern={REGEXP_ONLY_DIGITS}
                            autoComplete="one-time-code"
                            containerClassName="justify-center"
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
                    <Field>
                        <Button type="submit" size="lg">
                            {m.verify_submit()}
                        </Button>
                    </Field>
                    <FieldDescription className="text-center">
                        <Rich
                            message={m.verify_resend}
                            tags={{ resend: ({ children }) => <button type="button" className="underline underline-offset-4 hover:text-primary">{children}</button> }}
                        />
                    </FieldDescription>
                    <FieldDescription className="text-center">
                        <Link to="/account/login">{m.common_back_to_login()}</Link>
                    </FieldDescription>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
