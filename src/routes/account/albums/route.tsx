import { createFileRoute } from "@tanstack/react-router";
import { AccountSidebarLayout } from "@/components/account/layouts";

export const Route = createFileRoute("/account/albums")({
    component: AccountSidebarLayout,
});
