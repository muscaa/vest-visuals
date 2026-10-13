import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal";
import { privacy } from "@/components/legal/privacy";

export const Route = createFileRoute("/home/legal/privacy/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <LegalPage division="home" {...privacy} />;
}
