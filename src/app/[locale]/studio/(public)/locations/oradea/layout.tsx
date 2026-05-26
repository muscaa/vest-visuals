import {
    StudioNavbarLayout,
    createInfo,
} from "@/components/layouts";
import { LOCATIONS_ORADEA } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: LOCATIONS_ORADEA(),
        routeName: t("Metadata.locations-oradea.title"),
    }),
});

export default StudioNavbarLayout;
