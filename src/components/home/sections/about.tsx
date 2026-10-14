import { m } from "@shared/paraglide/messages";
import WorkingTogether from "@/components/illustrations/working-together.svg?react";
import { Eyebrow } from "@/components/eyebrow";
import { TextH2, TextP, TextSpan } from "@/components/typography";
import { Separator } from "@/components/ui/separator";

// labels are message functions, called while rendering
const facts = [
    { value: "2025", label: m.home_about_fact_since },
    { value: "10+", label: m.home_about_fact_projects },
    { value: "2+", label: m.home_about_fact_countries },
    { value: "24h", label: m.home_about_fact_response },
];

interface AboutSectionProps {}

export function AboutSection(props: AboutSectionProps) {
    return (
        <section
            id="despre"
            className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-muted to-transparent"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.home_about_eyebrow()}</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] items-center gap-8 md:gap-16">
                    <WorkingTogether aria-hidden className="size-72 justify-self-center" />
                    <div className="flex flex-col gap-6">
                        <TextH2 size="lg-3">{m.home_about_title()}</TextH2>
                        <TextP variant="muted" size="md-3" className="max-w-[52ch]">
                            {m.home_about_description()}
                        </TextP>
                    </div>
                </div>
                <Separator className="my-12" />
                <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                    {facts.map((fact) => (
                        <div key={fact.value} className="flex flex-col-reverse gap-2">
                            <TextSpan render={<dt />} variant="muted" size="sm-3" font="mono-1">
                                {fact.label()}
                            </TextSpan>
                            <TextSpan render={<dd />} size="lg-4">
                                {fact.value}
                            </TextSpan>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
