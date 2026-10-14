import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/software/service";
import { dataEngineering } from "@/i18n/software/services/data-engineering";

const technologies = ["PostgreSQL", "Python", "SQL", "Apache Airflow", "dbt", "ClickHouse", "Docker"];

export const Route = createFileRoute("/software/services/data-engineering/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="data-engineering" technologies={technologies} content={dataEngineering} />;
}
