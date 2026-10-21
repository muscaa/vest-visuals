import { createFileRoute } from "@tanstack/react-router";
import { AccountSidebarLayout } from "@/components/account/layouts";
import { requireSession } from "@/functions/auth";

/** The signed in part of the account site, with the sidebar. */
export const Route = createFileRoute("/account/_dashboard")({
    beforeLoad: requireSession,
    component: AccountSidebarLayout,
});
