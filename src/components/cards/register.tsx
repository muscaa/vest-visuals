"use client";

import { SimpleCard } from "./simple";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAuth } from "@/hooks/useAuth";
import { ButtonLink } from "../snippets";

function Footer() {
    return (
        <>
            <div className="flex justify-center items-center gap-1 mt-2">
                <ShieldCheck size={24} strokeWidth={1.5} className="size-6" />
                <p>Protected by reCAPTCHA</p>
            </div>
            <div className="text-center mt-2">
                Already have an account?{" "}
                <ButtonLink href="/login" variant="link" size="none">
                    Login
                </ButtonLink>
            </div>
        </>
    );
}

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
            footer={<Footer />}
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="email">E-mail</Label>
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
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
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
            </div>
        </SimpleCard>
    );
}
