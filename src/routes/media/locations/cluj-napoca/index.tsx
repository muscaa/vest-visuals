import { createFileRoute } from "@tanstack/react-router";
import { LocationPage, locationHead } from "@/components/media/location";
import { clujNapoca } from "@/i18n/media/locations/cluj-napoca";

export const Route = createFileRoute("/media/locations/cluj-napoca/")({
    head: (context) => locationHead(context, "cluj-napoca", clujNapoca),
    component: RouteComponent,
});

function RouteComponent() {
    return <LocationPage location="cluj-napoca" content={clujNapoca} />;
}
