import { createFileRoute } from "@tanstack/react-router";
import type { AssetKey } from "@shared/assets";
import { ServicePage } from "@/components/media/service";
import { automotive } from "@/i18n/media/services/automotive";

const images: AssetKey[] = [
    "media-service-automotive-1",
    "media-service-automotive-2",
    "media-service-automotive-3",
    "media-service-automotive-4",
    "media-service-automotive-5",
    "media-service-automotive-6",
];

export const Route = createFileRoute("/media/services/automotive/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="automotive" images={images} content={automotive} />;
}
