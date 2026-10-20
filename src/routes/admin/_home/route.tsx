import { createFileRoute } from "@tanstack/react-router";
import { AdminSidebarLayout } from "@/components/admin/layouts";

// TODO: only let admins in, once login works
export const Route = createFileRoute("/admin/_home")({
    component: AdminSidebarLayout,
});
