import { Main } from "@/components/main";
import { HeroSection } from "@/components/media/sections/hero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/media/_home/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Main>
            <HeroSection />
        </Main>
    );
}
