import { createFileRoute } from "@tanstack/react-router";
import type { AssetKey } from "@shared/assets";
import { ServicePage, mediaServiceHead } from "@/components/media/service";
import { eighteenthBirthday } from "@/i18n/media/services/18th-birthday";

const images: AssetKey[] = [
    "media-service-18th-birthday-1",
    "media-service-18th-birthday-2",
    "media-service-18th-birthday-3",
    "media-service-18th-birthday-4",
    "media-service-18th-birthday-5",
    "media-service-18th-birthday-6",
    "media-service-18th-birthday-7",
];

export const Route = createFileRoute("/media/services/18th-birthday/")({
    head: (context) => mediaServiceHead(context, eighteenthBirthday, images[0]),
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="18th-birthday" images={images} content={eighteenthBirthday} />;
}
