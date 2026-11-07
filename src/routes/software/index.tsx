import { createFileRoute } from "@tanstack/react-router";
import { m } from "@shared/paraglide/messages";
import { pageHead } from "@shared/seo";
import { Main } from "@/components/main";
import { CTASection } from "@/components/software/sections/cta";
import { HeroSection } from "@/components/software/sections/hero";
import { PortfolioSection } from "@/components/software/sections/portfolio";
import { ServicesSection } from "@/components/software/sections/services";

export const Route = createFileRoute("/software/")({
    head: (context) => pageHead(context, { title: m.meta_software_title(), description: m.meta_software_description() }),
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
