"use client";

import { ButtonLink } from "@/components/snippets";
import { TextH1, TextP, TextSpan } from "@/components/typography";
import { Separator } from "@/components/ui/separator";

interface Props {

}

export function ContactSection(props: Props) {
    return (
        <section id="contact" className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col items-center max-w-7xl w-full">
                <div className="flex items-center gap-4 mb-10 max-w-[58ch] w-full">
                    <TextSpan variant="muted" size="label" font="mono1">05</TextSpan>
                    <Separator className="shrink" />
                    <TextSpan variant="muted" size="label" font="mono1">Contact</TextSpan>
                </div>
                <TextH1 size="display" className="mb-4 text-center">
                    Tell us what you're
                    <br />
                    building.
                </TextH1>
                <TextP variant="muted" size="lead" className="max-w-[58ch] mb-14 text-center">
                    We reply within one business day. If it's a fit, we'll suggest a 30-minute discovery call; if not, we'll point you somewhere good.
                </TextP>
                <div className="grid grid-cols-2 gap-4">
                    <ButtonLink to="/contact" size="lg">Go to contact page</ButtonLink>
                    <ButtonLink href="mailto:contact@vestvisuals.ro" size="lg" variant="link">contact@vestvisuals.ro</ButtonLink>
                </div>
            </div>
        </section>
    );
}
