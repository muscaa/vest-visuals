"use client";

import { Main } from "@/components/main";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
    Phone,
    Mail,
    ShieldCheck,
} from "lucide-react";
import {
    SiWhatsapp,
} from "@icons-pack/react-simple-icons";
import {
    GoogleReCaptchaProvider,
    useGoogleReCaptcha
} from "react-google-recaptcha-v3";
import { useState } from "react";
import * as config from "@/config/public";
import {
    PostRequest,
    PostResponse,
} from "@/shared/api/contact";
import { Reveal } from "@/components/animations/reveal";

type ContactStatus = "sending" | "success" | "error";

function ContactForm() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [status, setStatus] = useState<ContactStatus>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!executeRecaptcha) return;

        setStatus("sending");
        setErrorMessage(undefined);

        const token = await executeRecaptcha("contact_form");

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token,
                name,
                email,
                message,
            } as PostRequest),
        });
        const json: PostResponse = await res.json();

        setStatus(json.success ? "success" : "error");
        setErrorMessage(json.message);
    };

    return (
        <Card className="w-xs lg:w-md">
            <CardHeader>
                <CardTitle>Mesaj Rapid</CardTitle>
                <CardDescription>Completeaza formularul de mai jos si vom raspunde cat de repede putem.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} autoComplete="on">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="name">Nume</Label>
                            <Input
                                id="name"
                                placeholder="Numele Tau"
                                maxLength={50}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                placeholder="nume@gmail.com"
                                maxLength={100}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="message">Mesaj</Label>
                            <Textarea
                                id="message"
                                placeholder="..."
                                className="h-36"
                                maxLength={1000}
                                required
                                onChange={(e) => setMessage(e.target.value)}
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
                <div className="flex items-center gap-2 w-full">
                    <div className="flex grow justify-center items-center gap-1">
                        <ShieldCheck size={24} strokeWidth={1.5} className="size-6" />
                        <p className="max-w-24 lg:max-w-full">Protected by reCAPTCHA</p>
                    </div>
                    <Button
                        type="submit"
                        variant="default"
                        size="lg"
                        disabled={status == "sending" || status == "success" || name.length == 0 || email.length == 0 || message.length == 0}
                        onClick={handleSubmit}
                    >
                        {status == "success" ? "Trimis!" : "Trimite"}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

interface CardLinkProps {
    href: string;
    icon: React.ComponentType<{ size?: number, strokeWidth?: number, className?: string }>;
    title: string;
    text: string;
}

function CardLink(props: CardLinkProps) {
    return (
        <Link href={props.href} target="_blank">
            <Button variant="card" size="none" className="cursor-pointer">
                <div className="flex gap-4 items-center">
                    <props.icon size={32} strokeWidth={1.5} className="size-8" />
                    <div className="flex flex-col">
                        <h4>{props.title}</h4>
                        <p className="text-muted-foreground">{props.text}</p>
                    </div>
                </div>
            </Button>
        </Link>
    );
}

function ContactOther() {
    return (
        <div className="w-xs lg:w-md flex flex-col gap-2">
            <Reveal delay={100}>
                <CardLink
                    href="tel:+40723971618"
                    icon={Phone}
                    title="Telefon"
                    text="+40 723 971 618"
                />
            </Reveal>
            <Reveal delay={200}>
                <CardLink
                    href="https://api.whatsapp.com/send?phone=40723971618&text"
                    icon={SiWhatsapp}
                    title="WhatsApp"
                    text="+40 723 971 618"
                />
            </Reveal>
            <Reveal delay={300}>
                <CardLink
                    href="mailto:contact@vestvisuals.ro"
                    icon={Mail}
                    title="E-mail"
                    text="contact@vestvisuals.ro"
                />
            </Reveal>
        </div>
    );
}

export default function Page() {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={config.env.RECAPTCHA_KEY_SITE}
        >
            <Main>
                <div className="flex flex-col lg:flex-row items-center justify-center size-full gap-8 py-8">
                    <Reveal>
                        <ContactForm />
                    </Reveal>
                    <Reveal direction="none">
                        <h4>SAU</h4>
                    </Reveal>
                    <ContactOther />
                </div>
            </Main>
        </GoogleReCaptchaProvider>
    );
}
