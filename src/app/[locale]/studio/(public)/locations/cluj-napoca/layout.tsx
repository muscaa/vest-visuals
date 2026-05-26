import {
    StudioNavbarLayout,
    createInfo,
} from "@/components/layouts";
import { LOCATIONS_CLUJ_NAPOCA } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: LOCATIONS_CLUJ_NAPOCA(),
        routeName: t("Metadata.locations-cluj-napoca.title"),
    }),
});

export default StudioNavbarLayout;
