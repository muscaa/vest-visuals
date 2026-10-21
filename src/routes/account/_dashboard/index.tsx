import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/layout/sidebar";

export const Route = createFileRoute("/account/_dashboard/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <DashboardPage title={m.account_welcome_title()} description={m.account_welcome_description()} />;
}
