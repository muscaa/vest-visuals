import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/layout/sidebar";

export const Route = createFileRoute("/admin/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <DashboardPage title={m.admin_welcome_title()} description={m.admin_welcome_description()} />;
}
