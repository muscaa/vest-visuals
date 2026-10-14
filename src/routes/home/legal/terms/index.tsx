import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal";
import { terms } from "@/i18n/legal/terms";

export const Route = createFileRoute("/home/legal/terms/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <LegalPage division="home" id="terms" document={terms} />;
}
