import { createFileRoute } from "@tanstack/react-router";
import { LocationPage } from "@/components/media/location";
import { bucuresti } from "@/i18n/media/locations/bucuresti";

export const Route = createFileRoute("/media/locations/bucuresti/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <LocationPage location="bucuresti" content={bucuresti} />;
}
