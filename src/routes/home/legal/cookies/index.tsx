import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/legal";
import { cookies } from "@/i18n/legal/cookies";

export const Route = createFileRoute("/home/legal/cookies/")({
    head: (context) => legalHead(context, "cookies"),
    component: RouteComponent,
});

function RouteComponent() {
    return <LegalPage division="home" id="cookies" document={cookies} />;
}
