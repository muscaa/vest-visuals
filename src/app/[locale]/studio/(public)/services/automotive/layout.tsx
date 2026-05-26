import {
    StudioNavbarLayout,
    createInfo,
} from "@/components/layouts";
import { SERVICES_AUTOMOTIVE } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: SERVICES_AUTOMOTIVE(),
        routeName: t("Metadata.services-automotive.title"),
    }),
});

export default StudioNavbarLayout;
