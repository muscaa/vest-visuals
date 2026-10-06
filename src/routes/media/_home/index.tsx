import { Main } from "@/components/main";
import { AboutSection } from "@/components/media/sections/about";
import { HeroSection } from "@/components/media/sections/hero";
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
        </Main>
    );
}
