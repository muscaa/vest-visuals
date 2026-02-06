import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { SERVICES_CHRISTENING } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: SERVICES_CHRISTENING(),
        routeName: t("Metadata.services-christening.title"),
    }),
});

export default NavbarLayout;
