import {
    StudioNavbarLayout,
    createInfo,
} from "@/components/layouts";
import { LOCATIONS_BUCURESTI } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: LOCATIONS_BUCURESTI(),
        routeName: t("Metadata.locations-bucuresti.title"),
    }),
});

export default StudioNavbarLayout;
