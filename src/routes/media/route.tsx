import { createFileRoute } from "@tanstack/react-router";
import { MediaNavbarLayout } from "@/components/media/layouts";

/** Every page of the site shares the navbar layout. */
export const Route = createFileRoute("/media")({
    component: MediaNavbarLayout,
});
