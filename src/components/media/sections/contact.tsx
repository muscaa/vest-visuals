"use client";

import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/snippets";
import { TextH1, TextP } from "@/components/typography";
import { useTranslations } from "next-intl";

interface Props {

}

export function MediaContactSection(props: Props) {
    const t = useTranslations("Media.Page.home.contact");

    return (
        <section id="contact" className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col items-center max-w-7xl w-full">
                <Eyebrow num="06" className="max-w-[58ch] w-full">
                    {t("eyebrow")}
                </Eyebrow>
                <TextH1 size="title" className="mb-8 text-center">
                    {
                        t.rich("title", {
                            accent: (chunks) => (
                                <i className="text-primary">{chunks}</i>
                            )
                        })
                    }
                </TextH1>
                <TextP variant="muted" size="lead" className="max-w-[58ch] mb-16 text-center">
                    {t("description")}
                </TextP>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ButtonLink to="/contact" size="lg">
                        {t("button")}
                    </ButtonLink>
                    <ButtonLink href="mailto:contact@vestvisuals.ro" size="lg" variant="link">
                        contact@vestvisuals.ro
                    </ButtonLink>
                </div>
            </div>
        </section>
    );
}
