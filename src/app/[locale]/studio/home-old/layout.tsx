import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
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

export default NavbarLayout;
