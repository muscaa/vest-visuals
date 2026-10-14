import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/software/service";
import { supportMaintenance } from "@/i18n/software/services/support-maintenance";

const technologies = ["Monitorizare", "Backup", "Securitate", "Docker", "Linux", "PostgreSQL"];

export const Route = createFileRoute("/software/services/support-maintenance/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="support-maintenance" technologies={technologies} content={supportMaintenance} />;
}
