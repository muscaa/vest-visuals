import { createFileRoute } from "@tanstack/react-router";
import { LocationPage, locationHead } from "@/components/media/location";
import { drobetaTurnuSeverin } from "@/i18n/media/locations/drobeta-turnu-severin";

export const Route = createFileRoute("/media/locations/drobeta-turnu-severin/")({
    head: (context) => locationHead(context, "drobeta-turnu-severin", drobetaTurnuSeverin),
    component: RouteComponent,
});

function RouteComponent() {
    return <LocationPage location="drobeta-turnu-severin" content={drobetaTurnuSeverin} />;
}
