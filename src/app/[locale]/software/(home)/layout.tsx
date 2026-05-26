import {
    SoftwareNavbarLayout,
    createInfo,
} from "@/components/layouts";
import { HOME } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: HOME(),
        routeName: t("Metadata.home.title"),
    }),
});

export default SoftwareNavbarLayout;
