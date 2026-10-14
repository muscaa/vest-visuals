import { createFileRoute } from "@tanstack/react-router";
import { LocationPage } from "@/components/media/location";
import { arad } from "@/i18n/media/locations/arad";

export const Route = createFileRoute("/media/locations/arad/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <LocationPage location="arad" freeTravel content={arad} />;
}
