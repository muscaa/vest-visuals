import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/contact";

export const Route = createFileRoute("/media/_home/contact/")({
    component: ContactPage,
});
