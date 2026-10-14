import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal";
import { privacy } from "@/i18n/legal/privacy";

export const Route = createFileRoute("/home/legal/privacy/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <LegalPage division="home" id="privacy" document={privacy} />;
}
