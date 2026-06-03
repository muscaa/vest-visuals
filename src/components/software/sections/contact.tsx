"use client";

import { ButtonLink } from "@/components/snippets";
import { TextH1, TextP, TextSpan } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

interface Props {

}

export function ContactSection(props: Props) {
    const t = useTranslations("Software.Page.home.contact");

    return (
        <section id="contact" className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col items-center max-w-7xl w-full">
                <div className="flex items-center gap-4 mb-10 max-w-[58ch] w-full">
                    <TextSpan variant="muted" size="label" font="mono1">05</TextSpan>
                    <Separator className="shrink" />
                    <TextSpan variant="muted" size="label" font="mono1" className="shrink-0">
                        {t("eyebrow")}
                    </TextSpan>
                </div>
                <TextH1 size="display" className="mb-4 text-center max-w-[15ch]">
                    {t("title")}
                    {/* Tell us what you're
                    <br />
                    building. */}
                </TextH1>
                <TextP variant="muted" size="lead" className="max-w-[58ch] mb-14 text-center">
                    {t("description")}
                </TextP>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ButtonLink to="/contact" size="lg">
                        {t("button")}
                    </ButtonLink>
                    <ButtonLink href="mailto:contact@vestvisuals.ro" size="lg" variant="link">contact@vestvisuals.ro</ButtonLink>
                </div>
            </div>
        </section>
    );
}
