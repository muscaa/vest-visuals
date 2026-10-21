import { createFileRoute } from "@tanstack/react-router";
import { Main } from "@/components/main";
import { AboutSection } from "@/components/media/sections/about";
import { BeforeAndAfterSection } from "@/components/media/sections/before-and-after";
import { CTASection } from "@/components/media/sections/cta";
import { HeroSection } from "@/components/media/sections/hero";
import { LocationsSection } from "@/components/media/sections/locations";
import { PortfolioSection } from "@/components/media/sections/portfolio";

export const Route = createFileRoute("/media/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Main>
            <HeroSection />
            <AboutSection />
            <PortfolioSection />
            <BeforeAndAfterSection />
            <LocationsSection />
            <CTASection />
        </Main>
    );
}
