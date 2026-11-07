import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, softwareServiceHead } from "@/components/software/service";
import { cloudDevops } from "@/i18n/software/services/cloud-devops";

const technologies = ["Docker", "Kubernetes", "AWS", "Google Cloud", "Hetzner", "Terraform", "GitHub Actions", "Linux"];

export const Route = createFileRoute("/software/services/cloud-devops/")({
    head: (context) => softwareServiceHead(context, cloudDevops),
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="cloud-devops" technologies={technologies} content={cloudDevops} />;
}
