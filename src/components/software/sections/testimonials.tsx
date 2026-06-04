import { ReviewCarousel } from "@/components/review";
import { TextH1, TextP, TextSpan } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

interface Props {

}

export function SoftwareTestimonialsSection(props: Props) {
    const t = useTranslations("Software.Page.home.testimonials");

    return (
        <div className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-br from-primary/20 to-success/20 border-b">
            <div className="flex flex-col max-w-7xl w-full">
                <div className="flex items-center gap-4 mb-10">
                    <TextSpan variant="muted" size="label" font="mono1">03</TextSpan>
                    <Separator className="shrink" />
                    <TextSpan variant="muted" size="label" font="mono1" className="shrink-0">
                        {t("eyebrow")}
                    </TextSpan>
                </div>
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
