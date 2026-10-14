import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/media/service";
import { eighteenthBirthday } from "@/i18n/media/services/18th-birthday";

const images = [
    "https://cdn0.vestvisuals.ro/portfolio/qyko3rjjfg14yjhvs2l45wck/large",
    "https://cdn0.vestvisuals.ro/portfolio/edxehljl77ssdkxq9nw9gqx5/large",
    "https://cdn0.vestvisuals.ro/portfolio/bufx0duqpa13cgbsowldzuqh/large",
    "https://cdn0.vestvisuals.ro/portfolio/l80gztc0uljicevwrh615f6u/large",
    "https://cdn0.vestvisuals.ro/portfolio/a3zmgxetb5n6r8sl5jnc87hz/large",
    "https://cdn0.vestvisuals.ro/portfolio/x7nxyoz3hwdezu4tr33kb4gw/large",
    "https://cdn0.vestvisuals.ro/portfolio/s9izbjl5t4rvdjanoonj8jyp/large",
];

export const Route = createFileRoute("/media/services/18th-birthday/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="18th-birthday" images={images} content={eighteenthBirthday} />;
}
