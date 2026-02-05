import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { SERVICES_REAL_ESTATE } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: SERVICES_REAL_ESTATE(),
        routeName: t("Metadata.services-real-estate.title"),
    }),
});

export default NavbarLayout;
