import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/media/service";
import { christening } from "@/i18n/media/services/christening";

const images = [
    // TODO: add photos from this category, the old page had none
    "https://cdn0.vestvisuals.ro/portfolio/yu9eomg0ef4f66u2gpbqws4t/large",
];

export const Route = createFileRoute("/media/services/christening/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="christening" images={images} content={christening} />;
}
