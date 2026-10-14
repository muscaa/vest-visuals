import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/software/service";
import { webApps } from "@/i18n/software/services/web-apps";

const technologies = ["React", "TypeScript", "TanStack Start", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Docker"];

export const Route = createFileRoute("/software/services/web-apps/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="web-apps" technologies={technologies} content={webApps} />;
}
