import { createFileRoute } from "@tanstack/react-router";
import { m } from "@shared/paraglide/messages";
import { dashboardHead } from "@/components/layout/sidebar";
import { AccountSidebarLayout } from "@/components/account/layouts";
import { requireSession } from "@/functions/auth";

/** The signed in part of the account site, with the sidebar. */
export const Route = createFileRoute("/account/_dashboard")({
    beforeLoad: requireSession,
    head: ({ matches }) => dashboardHead(matches, m.meta_account_title()),
    component: AccountSidebarLayout,
});
