import { createFileRoute } from "@tanstack/react-router";
import { AdminSidebarLayout } from "@/components/admin/layouts";

export const Route = createFileRoute("/admin/portfolio")({
    component: AdminSidebarLayout,
});
