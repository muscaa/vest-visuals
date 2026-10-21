import { createFileRoute } from "@tanstack/react-router";
import { AdminSidebarLayout } from "@/components/admin/layouts";
import { requireAdmin } from "@/functions/auth";

export const Route = createFileRoute("/admin/albums")({
    beforeLoad: requireAdmin,
    component: AdminSidebarLayout,
});
