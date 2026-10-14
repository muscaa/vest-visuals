import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/media/service";
import { realEstate } from "@/i18n/media/services/real-estate";

const images = [
    "https://s3.vestvisuals.ro/portfolio/f64uxutmybs9iuc08j1cp73y/large",
    "https://s3.vestvisuals.ro/portfolio/hwktjt5gmgoefmt69q3fckiv/large",
    "https://s3.vestvisuals.ro/portfolio/dl07n8adsot5whobspse96kv/large",
];

export const Route = createFileRoute("/media/services/real-estate/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="real-estate" images={images} content={realEstate} />;
}
