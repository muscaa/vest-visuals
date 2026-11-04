import { createFileRoute } from "@tanstack/react-router";
import type { AssetKey } from "@shared/assets";
import { ServicePage, mediaServiceHead } from "@/components/media/service";
import { christening } from "@/i18n/media/services/christening";

const images: AssetKey[] = [
    "media-service-christening-1",
    "media-service-christening-2",
    "media-service-christening-3",
    "media-service-christening-4",
    "media-service-christening-5",
];

export const Route = createFileRoute("/media/services/christening/")({
    head: (context) => mediaServiceHead(context, christening, images[0]),
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="christening" images={images} content={christening} />;
}
