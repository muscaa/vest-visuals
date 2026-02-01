"use client";

import { SimpleCard } from "./simple";
import { useState } from "react";
import { Input } from "../ui/input";
import { useAuth } from "@/hooks/useAuth";
import { ButtonLink } from "../snippets";
import { REGISTER } from "@shared/paths";
import { CardFooterReCaptchaVertical } from "./footers";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

interface Props {
    onLogin?: () => void;
}

export function LoginCard(props: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const submit = async () => {
        await login.mutateAsync({ email, password });
    };

    return (
        <SimpleCard
            submit={submit}
            title="Login"
            description="Enter your email and password to login"
            submitText={{
                default: "Login",
                sending: "Logging in...",
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
                        Don&apos;t have an account?{" "}
                        <ButtonLink href={REGISTER} variant="link" size="none">
                            Register
                        </ButtonLink>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </SimpleCard>
    );
}
