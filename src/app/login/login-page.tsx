"use client";

import { Main } from "@/components/main";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    ShieldCheck,
} from "lucide-react";
import {
    GoogleReCaptchaProvider,
    useGoogleReCaptcha
} from "react-google-recaptcha-v3";
import { useState } from "react";
import * as types from "@/types/api/auth/login";
import { client_config } from "@/utils/client/config";
import { redirect } from "next/navigation";
import { api_client } from "@/utils/client/axios";

type LoginStatus = "login" | "success" | "error";

function LoginForm() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [status, setStatus] = useState<LoginStatus>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!executeRecaptcha) return;

        setStatus("login");
        setErrorMessage(undefined);

        const token = await executeRecaptcha("login_form");

        const { data } = await api_client.post<types.PostResponse, types.PostRequest>("/auth/login", {
            token,
            email,
            password,
        });

        setStatus(data.success ? "success" : "error");
        setErrorMessage(data.message);

        if (data.success) {
            redirect("/a");
        }
    };

    return (
        <Card className="max-w-sm w-full">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Enter your email and password to login
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} autoComplete="on">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="nume@gmail.com"
                                maxLength={100}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="password">Parola</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                maxLength={100}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                {
                    errorMessage && (
                        <p className="text-destructive">{errorMessage}</p>
                    )
                }
                <div className="flex flex-col justify-center items-center gap-4 w-full">
                    <Button
                        type="submit"
                        variant="default"
                        disabled={status == "login" || status == "success" || email.length == 0 || password.length == 0}
                        onClick={handleSubmit}
                        className="w-full"
                    >
                        {status == "login" ? "Logging in..." : "Login"}
                    </Button>
                    <div className="flex justify-center items-center gap-1">
                        <ShieldCheck size={24} strokeWidth={1.5} className="size-6" />
                        <p>Protected by reCAPTCHA</p>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}

export default function Page() {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={client_config.env.RECAPTCHA_KEY_SITE}
        >
            <Main>
                <div className="flex flex-col justify-center items-center size-full p-8">
                    <LoginForm />
                </div>
            </Main>
        </GoogleReCaptchaProvider>
    );
}
