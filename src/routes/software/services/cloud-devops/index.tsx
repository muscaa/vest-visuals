import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/software/service";
import { cloudDevops } from "@/i18n/software/services/cloud-devops";

const technologies = ["Docker", "Kubernetes", "AWS", "Google Cloud", "Hetzner", "Terraform", "GitHub Actions", "Linux"];

export const Route = createFileRoute("/software/services/cloud-devops/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="cloud-devops" technologies={technologies} content={cloudDevops} />;
}
