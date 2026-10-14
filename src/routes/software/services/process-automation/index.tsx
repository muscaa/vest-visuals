import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/software/service";
import { processAutomation } from "@/i18n/software/services/process-automation";

const technologies = ["n8n", "Make", "Zapier", "Python", "Node.js", "REST APIs", "PostgreSQL"];

export const Route = createFileRoute("/software/services/process-automation/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="process-automation" technologies={technologies} content={processAutomation} />;
}
