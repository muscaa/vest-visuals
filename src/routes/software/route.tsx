import { createFileRoute } from "@tanstack/react-router";
import { SoftwareNavbarLayout } from "@/components/software/layouts";

/** Every page of the site shares the navbar layout. */
export const Route = createFileRoute("/software")({
    component: SoftwareNavbarLayout,
});
