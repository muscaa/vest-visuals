import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { SERVICES_AUTOMOTIVE } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: SERVICES_AUTOMOTIVE(),
        routeName: t("Metadata.services-automotive.title"),
    }),
});

export default NavbarLayout;
