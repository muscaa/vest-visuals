import { createFileRoute } from "@tanstack/react-router";
import { LocationPage } from "@/components/media/location";
import { drobetaTurnuSeverin } from "@/i18n/media/locations/drobeta-turnu-severin";

export const Route = createFileRoute("/media/locations/drobeta-turnu-severin/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <LocationPage location="drobeta-turnu-severin" content={drobetaTurnuSeverin} />;
}
