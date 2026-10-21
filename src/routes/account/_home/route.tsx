import { createFileRoute } from "@tanstack/react-router";
import { AccountSidebarLayout } from "@/components/account/layouts";
import { requireSession } from "@/functions/auth";

export const Route = createFileRoute("/account/_home")({
    beforeLoad: requireSession,
    component: AccountSidebarLayout,
});
