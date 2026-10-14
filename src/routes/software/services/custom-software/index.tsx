import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/software/service";
import { customSoftware } from "@/i18n/software/services/custom-software";

const technologies = ["TypeScript", "Electron", "Node.js", "Python", "PostgreSQL", "REST & GraphQL APIs", "Docker"];

export const Route = createFileRoute("/software/services/custom-software/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="custom-software" technologies={technologies} content={customSoftware} />;
}
