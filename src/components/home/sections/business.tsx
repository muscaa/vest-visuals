import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { IconArrowRight } from "@tabler/icons-react";
import { divisions } from "./hero";
import SuccessfulBusiness2 from "@/components/illustrations/successful-business-2.svg?react";
import { HoverCard } from "@/components/cards/hover";
import { Eyebrow } from "@/components/eyebrow";
import { TextH2, TextH3, TextP, TextSpan } from "@/components/typography";

interface BusinessSectionProps {}

export function BusinessSection(props: BusinessSectionProps) {
    const offers = divisions.filter(
        (division) => division.business && division.audience.includes("afaceri"),
    );

    return (
        <section
            id="business"
            className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-muted to-transparent"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.home_business_eyebrow()}</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] items-center gap-8 md:gap-16 mb-16">
                    <div className="flex flex-col gap-6">
                        <TextH2 size="lg-3">
                            {m.home_business_title()}
                        </TextH2>
                        <TextP variant="muted" size="md-3" className="max-w-[52ch]">
                            {m.home_business_description()}
                        </TextP>
                    </div>
                    <SuccessfulBusiness2 aria-hidden className="size-72 justify-self-center" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {offers.map((division) => (
                        <Link key={division.id} {...division.link} className="group/offer">
                            <HoverCard className="h-full gap-2 px-8">
                                <TextSpan variant="muted" size="sm-3" font="mono-1">
                                    {division.name}
                                </TextSpan>
                                <div className="flex justify-between items-center gap-4">
                                    <TextH3 size="md-2">{division.business!.title()}</TextH3>
                                    <IconArrowRight className="shrink-0 text-muted-foreground transition-all group-hover/offer:translate-x-1 group-hover/offer:text-primary" />
                                </div>
                                <TextP variant="muted">{division.business!.description()}</TextP>
                            </HoverCard>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
