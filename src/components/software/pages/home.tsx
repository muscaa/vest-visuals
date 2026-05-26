import { ContactSection } from "../sections/contact";
import { FAQSection } from "../sections/faq";
import { HeroSection } from "../sections/hero";
import { ProjectsSection } from "../sections/projects";
import { ServicesSection } from "../sections/services";
import { TestimonialsSection } from "../sections/testimonials";

interface Props {

}

export function HomePage(props: Props) {
    return (
        <>
            <HeroSection />
            <ServicesSection />
            <ProjectsSection />
            <TestimonialsSection />
            <FAQSection />
            <ContactSection />
        </>
    );
}
