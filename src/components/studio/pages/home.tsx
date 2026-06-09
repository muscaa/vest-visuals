import { StudioAboutSection } from "../sections/about";
import { StudioBeforeAndAfterSection } from "../sections/before-and-after";
import { StudioContactSection } from "../sections/contact";
import { StudioHeroSection } from "../sections/hero";
import { StudioLocationsSection } from "../sections/locations";
import { StudioPortfolioSection } from "../sections/portfolio";
import { StudioTestimonialsSection } from "../sections/testimonials";

interface Props {

}

export function StudioHomePage(props: Props) {
    return (
        <>
            <StudioHeroSection />
            <StudioAboutSection />
            <StudioPortfolioSection />
            <StudioBeforeAndAfterSection />
            <StudioTestimonialsSection />
            <StudioLocationsSection />
            <StudioContactSection />
        </>
    );
}
