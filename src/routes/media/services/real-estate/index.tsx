import { createFileRoute } from "@tanstack/react-router";
import type { AssetKey } from "@shared/assets";
import { ServicePage, mediaServiceHead } from "@/components/media/service";
import { realEstate } from "@/i18n/media/services/real-estate";

const images: AssetKey[] = [
    "media-service-real-estate-1",
    "media-service-real-estate-2",
    "media-service-real-estate-3",
];

export const Route = createFileRoute("/media/services/real-estate/")({
    head: (context) => mediaServiceHead(context, realEstate, images[0]),
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="real-estate" images={images} content={realEstate} />;
}
