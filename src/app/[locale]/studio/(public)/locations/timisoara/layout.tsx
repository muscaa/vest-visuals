import {
    StudioNavbarLayout,
    createInfo,
} from "@/components/layouts";
import { LOCATIONS_TIMISOARA } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: LOCATIONS_TIMISOARA(),
        routeName: t("Metadata.locations-timisoara.title"),
    }),
});

export default StudioNavbarLayout;
