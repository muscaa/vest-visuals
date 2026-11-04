import { createFileRoute } from "@tanstack/react-router";
import type { AssetKey } from "@shared/assets";
import { ServicePage } from "@/components/media/service";
import { wedding } from "@/i18n/media/services/wedding";

const images: AssetKey[] = [
    "media-service-wedding-1",
    "media-service-wedding-2",
    "media-service-wedding-3",
    "media-service-wedding-4",
    "media-service-wedding-5",
];

export const Route = createFileRoute("/media/services/wedding/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="wedding" images={images} content={wedding} />;
}
