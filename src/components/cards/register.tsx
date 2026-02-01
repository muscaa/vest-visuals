"use client";

import { SimpleCard } from "./simple";
import { useState } from "react";
import { Input } from "../ui/input";
import { useAuth } from "@/hooks/useAuth";
import { ButtonLink } from "../snippets";
import { LOGIN } from "@shared/paths";
import { CardFooterReCaptchaVertical } from "./footers";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { TextLink } from "../ui/text-link";

interface Props {
    onLogin?: () => void;
}

export function RegisterCard(props: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register } = useAuth();

    const submit = async () => {
        await register.mutateAsync({ email, password });
    };

    return (
        <SimpleCard
            submit={submit}
            title="Register"
            description="Enter your email and password to register"
            submitText={{
                default: "Register",
                sending: "Registering...",
            }}
            submitDisabled={!email || !password}
            onSuccess={props.onLogin}
            footer={CardFooterReCaptchaVertical}
            className="max-w-sm"
        >
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="email">E-mail</FieldLabel>
                    <Input
                        ref={(element) => {
                            if (element) {
                                setEmail(element.value);
                            }
                        }}
                        id="email"
                        type="email"
                        placeholder="nume@gmail.com"
                        maxLength={100}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        ref={(element) => {
                            if (element) {
                                setPassword(element.value);
                            }
                        }}
                        id="password"
                        type="password"
                        placeholder="********"
                        maxLength={100}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldDescription>
                        Already have an account?{" "}
                        <TextLink href={LOGIN}>
                            Login
                        </TextLink>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </SimpleCard>
    );
}
