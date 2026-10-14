import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal";
import { terms } from "@/i18n/legal/terms";

export const Route = createFileRoute("/software/legal/terms/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <LegalPage division="software" id="terms" document={terms} />;
}
