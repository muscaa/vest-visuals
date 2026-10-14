import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/media/service";
import { businessPromotion } from "@/i18n/media/services/business-promotion";

const images = [
    "https://s3.vestvisuals.ro/portfolio/xrja8xss5xpgf6ytj14rvcr0/large",
    "https://s3.vestvisuals.ro/portfolio/h0mbepdrz7ezs0eu7jy2mao1/large",
    "https://s3.vestvisuals.ro/portfolio/ap4odtdq7pcy2o02g8l9mvmg/large",
    "https://s3.vestvisuals.ro/portfolio/kci4tsjlnm3l5kywact8srbd/large",
    "https://s3.vestvisuals.ro/portfolio/lccacqbntvcqc1laix9cpa8g/large",
];

export const Route = createFileRoute("/media/services/business-promotion/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="business-promotion" images={images} content={businessPromotion} />;
}
