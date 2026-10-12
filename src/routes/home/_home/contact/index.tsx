import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/contact";

export const Route = createFileRoute("/home/_home/contact/")({
    component: ContactPage,
});
