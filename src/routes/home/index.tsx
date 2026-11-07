import { createFileRoute } from "@tanstack/react-router";
import { m } from "@shared/paraglide/messages";
import { organizationData, pageHead } from "@shared/seo";
import { AboutSection } from "@/components/home/sections/about";
import { ContactSection } from "@/components/home/sections/contact";
import { DivisionsSection } from "@/components/home/sections/hero";
import { WelcomeSection } from "@/components/home/sections/welcome";
import { Main } from "@/components/main";

export const Route = createFileRoute("/home/")({
    head: (context) => pageHead(context, { title: m.meta_home_title(), description: m.meta_home_description(), data: [organizationData()] }),
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
