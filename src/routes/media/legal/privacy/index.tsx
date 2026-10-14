import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal";
import { privacy } from "@/i18n/legal/privacy";

export const Route = createFileRoute("/media/legal/privacy/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <LegalPage division="media" id="privacy" document={privacy} />;
}
