"use client";

import { SimpleCard } from "./simple";
import { useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "../ui/field";

interface Props {
    onSubmit: (code: string) => Promise<void>;
    onSuccess?: () => void;
    title?: string;
    description?: string;
    length?: number;
}

export function OTPCard(props: Props) {
    const title = props.title || "Verification";
    const description = props.description || "Enter email OTP code";
    const length = props.length || 6;

    const [code, setCode] = useState("");

    const submit = async () => {
        await props.onSubmit(code);
    };

    return (
        <SimpleCard
            submit={submit}
            title={title}
            description={description}
            submitText={{
                default: "Verify",
                sending: "Verifying...",
            }}
            submitDisabled={code.length != length}
            onSuccess={props.onSuccess}
            className="max-w-sm text-center"
        >
            <FieldGroup>
                <Field orientation="none" className="flex flex-col items-center">
                    <FieldLabel htmlFor="otp">Code</FieldLabel>
                    <InputOTP
                        ref={(element) => element?.focus()}
                        id="otp"
                        maxLength={length}
                        pattern={REGEXP_ONLY_DIGITS}
                        required
                        value={code}
                        onChange={(value) => setCode(value)}
                    >
                        <InputOTPGroup>
                            {
                                Array.from({ length }).map((_, index) => (
                                    <InputOTPSlot key={index} index={index} />
                                ))
                            }
                        </InputOTPGroup>
                    </InputOTP>
                </Field>
            </FieldGroup>
        </SimpleCard>
    );
}
