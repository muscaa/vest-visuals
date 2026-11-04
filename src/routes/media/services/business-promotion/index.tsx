import { createFileRoute } from "@tanstack/react-router";
import type { AssetKey } from "@shared/assets";
import { ServicePage } from "@/components/media/service";
import { businessPromotion } from "@/i18n/media/services/business-promotion";

const images: AssetKey[] = [
    "media-service-business-promotion-1",
    "media-service-business-promotion-2",
    "media-service-business-promotion-3",
    "media-service-business-promotion-4",
    "media-service-business-promotion-5",
];

export const Route = createFileRoute("/media/services/business-promotion/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="business-promotion" images={images} content={businessPromotion} />;
}
