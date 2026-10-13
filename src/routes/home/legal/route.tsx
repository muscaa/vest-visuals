import { createFileRoute } from "@tanstack/react-router";
import { HomeNavbarLayout } from "@/components/home/layouts";

export const Route = createFileRoute("/home/legal")({
    component: HomeNavbarLayout,
});
