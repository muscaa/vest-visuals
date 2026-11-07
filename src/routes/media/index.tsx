import { createFileRoute } from "@tanstack/react-router";
import { m } from "@shared/paraglide/messages";
import { localBusinessData, pageHead } from "@shared/seo";
import { mediaLocations } from "@/components/media/location";
import { Main } from "@/components/main";
import { AboutSection } from "@/components/media/sections/about";
import { BeforeAndAfterSection } from "@/components/media/sections/before-and-after";
import { CTASection } from "@/components/media/sections/cta";
import { HeroSection } from "@/components/media/sections/hero";
import { LocationsSection } from "@/components/media/sections/locations";
import { PortfolioSection } from "@/components/media/sections/portfolio";

export const Route = createFileRoute("/media/")({
    head: (context) => pageHead(context, {
        title: m.meta_media_title(),
        description: m.meta_media_description(),
        photo: "media-hero-1",
        data: [localBusinessData(m.meta_media_description(), mediaLocations.map((location) => location.name()))],
    }),
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
