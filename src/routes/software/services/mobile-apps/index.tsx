import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/software/service";
import { mobileApps } from "@/i18n/software/services/mobile-apps";

const technologies = ["React Native", "TypeScript", "Expo", "Node.js", "PostgreSQL", "Firebase"];

export const Route = createFileRoute("/software/services/mobile-apps/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="mobile-apps" technologies={technologies} content={mobileApps} />;
}
