import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal";
import { cookies } from "@/components/legal/cookies";

export const Route = createFileRoute("/home/legal/cookies/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <LegalPage division="home" {...cookies} />;
}
