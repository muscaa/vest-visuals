import { createFileRoute } from "@tanstack/react-router";
import { LocationPage, locationHead } from "@/components/media/location";
import { timisoara } from "@/i18n/media/locations/timisoara";

export const Route = createFileRoute("/media/locations/timisoara/")({
    head: (context) => locationHead(context, "timisoara", timisoara),
    component: RouteComponent,
});

function RouteComponent() {
    return <LocationPage location="timisoara" freeTravel content={timisoara} />;
}
