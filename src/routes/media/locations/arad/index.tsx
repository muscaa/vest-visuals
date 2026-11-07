import { createFileRoute } from "@tanstack/react-router";
import { LocationPage, locationHead } from "@/components/media/location";
import { arad } from "@/i18n/media/locations/arad";

export const Route = createFileRoute("/media/locations/arad/")({
    head: (context) => locationHead(context, "arad", arad),
    component: RouteComponent,
});

function RouteComponent() {
    return <LocationPage location="arad" freeTravel content={arad} />;
}
