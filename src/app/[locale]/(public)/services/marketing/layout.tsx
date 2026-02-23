import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
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

export default NavbarLayout;
