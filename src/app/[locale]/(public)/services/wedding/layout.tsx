import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { SERVICES_WEDDING } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: SERVICES_WEDDING(),
        routeName: "Evenimente | Nunta",
    }),
});

export default NavbarLayout;
