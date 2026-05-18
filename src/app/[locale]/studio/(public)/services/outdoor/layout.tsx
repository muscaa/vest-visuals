import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { SERVICES_OUTDOOR } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: SERVICES_OUTDOOR(),
        routeName: t("Metadata.services-outdoor.title"),
    }),
});

export default NavbarLayout;
