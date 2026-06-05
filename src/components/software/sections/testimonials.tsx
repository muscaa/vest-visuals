"use client";

import { Eyebrow } from "@/components/eyebrow";
import { ReviewCarousel } from "@/components/review";
import { TextH1, TextP } from "@/components/typography";
import { useTranslations } from "next-intl";

interface Props {

}

export function SoftwareTestimonialsSection(props: Props) {
    const t = useTranslations("Software.Page.home.testimonials");

    return (
        <div className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-br from-primary/20 to-success/20 border-b">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="03">
                    {t("eyebrow")}
                </Eyebrow>
                <TextH1 className="mb-4 max-w-[20ch]">
                    {t("title")}
                </TextH1>
                <TextP variant="muted" size="lead" className="max-w-[56ch] mb-14">
                    {t("description")}
                </TextP>
                <ReviewCarousel
                    reviews={[
                        {
                            name: "Stefan",
                            role: "Project Manager",
                            image: "",
                            date: "22 may 2026",
                            score: 5,
                            description: "Many thanks for the platform, it looks great and it's incredibly fast!",
                        },
                        {
                            name: "Richard",
                            role: "Project Manager",
                            image: "",
                            date: "22 may 2026",
                            score: 5,
                            description: "These guys came up with some of the best-looking and most insightful business dashboards I've ever seen. Kudos!",
                        },
                        {
                            name: "Jordan",
                            role: "Project Manager",
                            image: "",
                            date: "22 may 2026",
                            score: 5,
                            description: "It was a great pleasure working with this team. They delivered high quality in record time as well.",
                        },
                    ]}
                />
            </div>
        </div>
    );
}
