import { createFileRoute } from "@tanstack/react-router";
import { MediaNavbarLayout } from "@/components/media/layouts";

export const Route = createFileRoute("/media/legal")({
    component: MediaNavbarLayout,
});
