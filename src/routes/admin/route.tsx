import { createFileRoute } from "@tanstack/react-router";
import { m } from "@shared/paraglide/messages";
import { dashboardHead } from "@/components/layout/sidebar";
import { AdminSidebarLayout } from "@/components/admin/layouts";
import { requireAdmin } from "@/functions/auth";

/** The whole admin site: admins only, with the sidebar. */
export const Route = createFileRoute("/admin")({
    beforeLoad: requireAdmin,
    head: ({ matches }) => dashboardHead(matches, m.admin_title()),
    component: AdminSidebarLayout,
});
