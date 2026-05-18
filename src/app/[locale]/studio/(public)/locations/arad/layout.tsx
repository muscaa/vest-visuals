import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { LOCATIONS_ARAD } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: LOCATIONS_ARAD(),
        routeName: t("Metadata.locations-arad.title"),
    }),
});

export default NavbarLayout;
