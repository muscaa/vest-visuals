import { createFileRoute } from "@tanstack/react-router";
import { LocationPage } from "@/components/media/location";
import { timisoara } from "@/i18n/media/locations/timisoara";

export const Route = createFileRoute("/media/locations/timisoara/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <LocationPage location="timisoara" freeTravel content={timisoara} />;
}
