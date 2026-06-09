import { SoftwareContactSection } from "../sections/contact";
import { SoftwareFAQSection } from "../sections/faq";
import { SoftwareHeroSection } from "../sections/hero";
// import { SoftwareProjectsSection } from "../sections/projects";
import { SoftwareServicesSection } from "../sections/services";
import { SoftwareTestimonialsSection } from "../sections/testimonials";

interface Props {

}

export function SoftwareHomePage(props: Props) {
    return (
        <>
            <SoftwareHeroSection />
            <SoftwareServicesSection />
            {/* <SoftwareProjectsSection /> */}
            <SoftwareTestimonialsSection />
            <SoftwareFAQSection />
            <SoftwareContactSection />
        </>
    );
}
