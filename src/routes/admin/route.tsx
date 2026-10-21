import { createFileRoute } from "@tanstack/react-router";
import { AdminSidebarLayout } from "@/components/admin/layouts";
import { requireAdmin } from "@/functions/auth";

/** The whole admin site: admins only, with the sidebar. */
export const Route = createFileRoute("/admin")({
    beforeLoad: requireAdmin,
    component: AdminSidebarLayout,
});
