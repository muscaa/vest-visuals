import { createFileRoute } from "@tanstack/react-router";
import { AccountSidebarLayout } from "@/components/account/layouts";

export const Route = createFileRoute("/account/_dashboard")({
    component: AccountSidebarLayout,
});
