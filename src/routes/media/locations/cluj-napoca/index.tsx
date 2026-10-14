import { createFileRoute } from "@tanstack/react-router";
import { LocationPage } from "@/components/media/location";
import { clujNapoca } from "@/i18n/media/locations/cluj-napoca";

export const Route = createFileRoute("/media/locations/cluj-napoca/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <LocationPage location="cluj-napoca" content={clujNapoca} />;
}
