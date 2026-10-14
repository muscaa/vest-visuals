import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/media/service";
import { automotive } from "@/i18n/media/services/automotive";

const images = [
    "https://s3.vestvisuals.ro/portfolio/ok1f6eurgum0dnwollokpqzv/large",
    "https://s3.vestvisuals.ro/portfolio/eoeuwr98zlfq3qftcfjg50t8/large",
    "https://s3.vestvisuals.ro/portfolio/seajnnjl9fh5a8sfwaxrprah/large",
    "https://s3.vestvisuals.ro/portfolio/ctqwipkk1927k8sa55hyodbd/large",
    "https://s3.vestvisuals.ro/portfolio/tuezrjoujv0hqvpbhydwt9k4/large",
    "https://s3.vestvisuals.ro/portfolio/xku47dpl4g4vorazvjfhdjjc/large",
];

export const Route = createFileRoute("/media/services/automotive/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="automotive" images={images} content={automotive} />;
}
