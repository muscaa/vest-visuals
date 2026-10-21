import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/home/sections/about";
import { ContactSection } from "@/components/home/sections/contact";
import { DivisionsSection } from "@/components/home/sections/hero";
import { WelcomeSection } from "@/components/home/sections/welcome";
import { Main } from "@/components/main";

export const Route = createFileRoute("/home/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Main>
            <WelcomeSection />
            <DivisionsSection />
            <AboutSection />
            <ContactSection />
        </Main>
    );
}
