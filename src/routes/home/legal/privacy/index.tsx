import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/legal";
import { privacy } from "@/i18n/legal/privacy";

export const Route = createFileRoute("/home/legal/privacy/")({
    head: (context) => legalHead(context, "privacy"),
    component: RouteComponent,
});

function RouteComponent() {
    return <LegalPage division="home" id="privacy" document={privacy} />;
}
