import { createFileRoute } from "@tanstack/react-router";
import { LocationPage } from "@/components/media/location";
import { oradea } from "@/i18n/media/locations/oradea";

export const Route = createFileRoute("/media/locations/oradea/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <LocationPage location="oradea" content={oradea} />;
}
