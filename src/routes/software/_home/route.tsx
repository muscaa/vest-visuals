import { createFileRoute } from "@tanstack/react-router";
import { SoftwareNavbarLayout } from "@/components/software/layouts";

export const Route = createFileRoute("/software/_home")({
    component: SoftwareNavbarLayout,
});
