import { createFileRoute } from "@tanstack/react-router";
import type { AssetKey } from "@shared/assets";
import { ServicePage } from "@/components/media/service";
import { photoSession } from "@/i18n/media/services/photo-session";

const images: AssetKey[] = [
    "media-service-photo-session-1",
    "media-service-photo-session-2",
    "media-service-photo-session-3",
    "media-service-photo-session-4",
    "media-service-photo-session-5",
    "media-service-photo-session-6",
    "media-service-photo-session-7",
];

export const Route = createFileRoute("/media/services/photo-session/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="photo-session" images={images} content={photoSession} />;
}
