"use client";

import {
    Phone,
    Mail,
} from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Reveal } from "@/components/animations/reveal";
import {
    ButtonLink,
    Icon,
} from "@/components/snippets";
import { ContactCard } from "../cards/contact";
import { cn } from "@shared/shadcn/lib/utils";

interface OtherLinkProps {
    href: string;
    icon: Icon;
    title: string;
    text: string;
}

function OtherLink(props: OtherLinkProps) {
    return (
        <ButtonLink href={props.href} target="_blank" variant="card" size="none">
            <div className="flex gap-4 items-center">
                <props.icon className="size-8" />
                <div className="flex flex-col">
                    <h4>{props.title}</h4>
                    <p className="text-muted-foreground">{props.text}</p>
                </div>
            </div>
        </ButtonLink>
    );
}

function Other() {
    return (
        <div className="w-xs lg:w-md flex flex-col gap-2">
            <Reveal delay={100}>
                <OtherLink
                    href="tel:+40723971618"
                    icon={Phone}
                    title="Telefon"
                    text="+40 723 971 618"
                />
            </Reveal>
            <Reveal delay={200}>
                <OtherLink
                    href="https://api.whatsapp.com/send?phone=40723971618&text"
                    icon={SiWhatsapp}
                    title="WhatsApp"
                    text="+40 723 971 618"
                />
            </Reveal>
            <Reveal delay={300}>
                <OtherLink
                    href="mailto:contact@vestvisuals.ro"
                    icon={Mail}
                    title="E-mail"
                    text="contact@vestvisuals.ro"
                />
            </Reveal>
        </div>
    );
}

interface Props {
    className?: string;
}

export function SectionContact(props: Props) {
    return (
        <section
            id="contact"
            className={cn("flex flex-col lg:flex-row justify-center items-center gap-8 p-8 w-full", props.className)}
        >
            <Reveal>
                <ContactCard />
            </Reveal>
            <Reveal direction="none">
                <span className="p4 text-muted-foreground">SAU</span>
            </Reveal>
            <Other />
        </section>
    );
}
