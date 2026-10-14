import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/media/service";
import { wedding } from "@/i18n/media/services/wedding";

const images = [
    // TODO: add photos from this category, the old page had none
    "https://s3.vestvisuals.ro/portfolio/b4dwo04rs8ta7na0zzbflpuv/large",
];

export const Route = createFileRoute("/media/services/wedding/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="wedding" images={images} content={wedding} />;
}
