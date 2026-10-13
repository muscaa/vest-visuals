import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal";
import { terms } from "@/components/legal/terms";

export const Route = createFileRoute("/media/legal/terms/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <LegalPage division="media" {...terms} />;
}
