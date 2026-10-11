import { createFileRoute } from "@tanstack/react-router";
import { Main } from "@/components/main";
import { CTASection } from "@/components/software/sections/cta";
import { HeroSection } from "@/components/software/sections/hero";
import { PortfolioSection } from "@/components/software/sections/portfolio";
import { ServicesSection } from "@/components/software/sections/services";

export const Route = createFileRoute("/software/_home/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Main>
            <HeroSection />
            <ServicesSection />
            <PortfolioSection />
            <CTASection />
        </Main>
    );
}
