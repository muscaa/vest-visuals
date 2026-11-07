import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import Workflow1 from "@/components/illustrations/workflow-1.svg?react";
import { TextH1, TextP } from "@/components/typography";
import { Button } from "@/components/ui/button";

interface HeroSectionProps { }

export function HeroSection(props: HeroSectionProps) {
    return (
        <section
            id="hero"
            className="relative flex flex-col justify-center items-center px-6 pt-24 pb-18 bg-linear-to-b from-transparent to-muted"
        >
            <div className="grid-background" />
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-16 max-w-7xl w-full">
                <div className="flex flex-col">
                    <TextH1 size="lg-3" className="max-w-[16ch]">
                        {m.software_hero_title()}
                    </TextH1>
                    <TextP variant="muted" size="md-3" className="max-w-[50ch] my-10">
                        {m.software_hero_description()}
                    </TextP>
                    <div className="flex flex-wrap gap-4">
                        <Button
                        size="xl"
                        nativeButton={false}
                        render={<Link to="/software/contact" />}
                    >
                        {m.software_hero_cta()}
                    </Button>
                        <Button
                            size="xl"
                            variant="outline"
                            nativeButton={false}
                            render={<Link to="/software" hash="services" />}
                        >
                            {m.software_hero_secondary()}
                        </Button>
                    </div>
                </div>
                <Workflow1 aria-hidden className="w-full max-w-md h-auto justify-self-center" />
            </div>
        </section>
    );
}
