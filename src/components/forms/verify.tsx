import { Link } from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";
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
                        <TextH1 size="md-2">Verifică-ți emailul</TextH1>
                        <TextP variant="muted" className="text-balance">
                            Ți-am trimis un cod de {codeLength} cifre. Introdu-l mai jos ca să intri în cont.
                        </TextP>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="code" className="sr-only">Cod de verificare</FieldLabel>
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
                            Verifică
                        </Button>
                    </Field>
                    <FieldDescription className="text-center">
                        Nu ai primit codul? <button type="button" className="underline underline-offset-4 hover:text-primary">Retrimite-l</button>
                    </FieldDescription>
                    <FieldDescription className="text-center">
                        <Link to="/account/login">Înapoi la autentificare</Link>
                    </FieldDescription>
                </FieldGroup>
            </form>
        </SplitCard>
    );
}
