import {
    StudioNavbarLayout,
    createInfo,
} from "@/components/layouts";
import { SERVICES_MARKETING } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: SERVICES_MARKETING(),
        routeName: t("Metadata.services-marketing.title"),
    }),
});

export default StudioNavbarLayout;
