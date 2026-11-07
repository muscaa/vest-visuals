import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/legal";
import { terms } from "@/i18n/legal/terms";

export const Route = createFileRoute("/media/legal/terms/")({
    head: (context) => legalHead(context, "terms"),
    component: RouteComponent,
});

function RouteComponent() {
    return <LegalPage division="media" id="terms" document={terms} />;
}
