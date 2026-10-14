import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/software/service";
import { businessIntelligence } from "@/i18n/software/services/business-intelligence";

const technologies = ["Power BI", "Metabase", "Looker Studio", "PostgreSQL", "SQL", "Python"];

export const Route = createFileRoute("/software/services/business-intelligence/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="business-intelligence" technologies={technologies} content={businessIntelligence} />;
}
