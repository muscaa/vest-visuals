"use client";

import { Eyebrow } from "@/components/eyebrow";
import { ReviewCarousel } from "@/components/review";
import { TextH1, TextP } from "@/components/typography";
import { useTranslations } from "next-intl";

interface Props {

}

export function StudioTestimonialsSection(props: Props) {
    const t = useTranslations("Studio.Page.home.testimonials");

    return (
        <section id="testimonials" className="flex flex-col justify-center items-center px-6 py-16 bg-muted">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="04">
                    {t("eyebrow")}
                </Eyebrow>
                {/* <div className="grid grid-cols-2 items-end gap-8 mb-16">
                    <TextH1 size="title">
                        Ce spun oamenii cu care am <i className="text-success">lucrat.</i>
                    </TextH1>
                    <TextP variant="muted" size="lead">
                    </TextP>
                </div> */}
                <TextH1 size="title" className="mb-16">
                    {
                        t.rich("title", {
                            accent: (chunks) => (
                                <i className="text-success">{chunks}</i>
                            )
                        })
                    }
                </TextH1>
                <ReviewCarousel
                    reviews={[
                        {
                            name: "Bara Denis",
                            role: "Sedinta foto",
                            image: "https://cdn0.vestvisuals.ro/portfolio/dafy5npxf0li1130hhap5tvo/small",
                            date: "22 mar 2026",
                            score: 5,
                            description: "Pozele au iesit super, va multumim mult de tot!!!! Le-am pus pe instagram cu drag, atat eu cat si iubita mea!"
                        },
                        {
                            name: "Ionut Condescu",
                            role: "Sedinta foto",
                            image: "https://cdn0.vestvisuals.ro/portfolio/uabl3f0ndb4hby7tf428qj9e/small",
                            date: "21 mar 2026",
                            score: 5,
                            description: "Multumim pentru poze, au ieșit super frumoase! Recomandam serviciile!"
                        },
                        {
                            name: "Oana",
                            role: "Majorat",
                            image: "https://cdn0.vestvisuals.ro/portfolio/m3u1fne49flwng97jamw3avp/small",
                            date: "14 feb 2026",
                            score: 5,
                            description: "Va multumim din suflet pentru tot! Ati fost minunați!"
                        },
                        {
                            name: "Vladescu Razvan",
                            role: "Imobiliare",
                            image: "https://cdn0.vestvisuals.ro/portfolio/f64uxutmybs9iuc08j1cp73y/small",
                            date: "31 aug 2025",
                            score: 5,
                            description: "Pozele la apartamentul meu au iesit foarte bine! M-au ajutat sa gasesc clienti si sa-l vand foarte repede. Punctualitate si profesionalism. Recomand!"
                        },
                        {
                            name: "Patrick Sabau",
                            role: "Automotive",
                            image: "https://cdn0.vestvisuals.ro/portfolio/ok1f6eurgum0dnwollokpqzv/small",
                            date: "16 iun 2025",
                            score: 5,
                            description: "Baietii de la Vest Visuals m-au ajutat cu niste poze si videoclipuri excelente pentru masina mea. Sunt foarte multumit!"
                        },
                    ]}
                />
            </div>
        </section>
    );
}
