import { Main } from "@/components/main";
import { AboutSection } from "@/components/media/sections/about";
import { BeforeAndAfterSection } from "@/components/media/sections/before-and-after";
import { HeroSection } from "@/components/media/sections/hero";
import { LocationsSection } from "@/components/media/sections/locations";
import { PortfolioSection } from "@/components/media/sections/portfolio";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/media/_home/")({
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
        </Main>
    );
}
