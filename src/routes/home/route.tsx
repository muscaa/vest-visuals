import { createFileRoute } from "@tanstack/react-router";
import { HomeNavbarLayout } from "@/components/home/layouts";

/** Every page of the site shares the navbar layout. */
export const Route = createFileRoute("/home")({
    component: HomeNavbarLayout,
});
