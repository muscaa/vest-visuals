import { MediaAboutSection } from "../sections/about";
import { MediaBeforeAndAfterSection } from "../sections/before-and-after";
import { MediaContactSection } from "../sections/contact";
import { MediaHeroSection } from "../sections/hero";
import { MediaLocationsSection } from "../sections/locations";
import { MediaPortfolioSection } from "../sections/portfolio";
import { MediaTestimonialsSection } from "../sections/testimonials";

interface Props {

}

export function MediaHomePage(props: Props) {
    return (
        <>
            <MediaHeroSection />
            <MediaAboutSection />
            <MediaPortfolioSection />
            <MediaBeforeAndAfterSection />
            <MediaTestimonialsSection />
            <MediaLocationsSection />
            <MediaContactSection />
        </>
    );
}
