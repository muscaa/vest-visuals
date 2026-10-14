import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/software/service";
import { technicalConsulting } from "@/i18n/software/services/technical-consulting";

// topics rather than product names, so they're translated
const technologies = {
    ro: ["Arhitectură software", "Code review", "Cloud", "Baze de date", "Securitate", "Performanță"],
    en: ["Software architecture", "Code review", "Cloud", "Databases", "Security", "Performance"],
};

export const Route = createFileRoute("/software/services/technical-consulting/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="technical-consulting" technologies={technologies} content={technicalConsulting} />;
}
