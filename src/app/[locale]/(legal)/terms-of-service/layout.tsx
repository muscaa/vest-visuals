import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { TERMS_OF_SERVICE } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: TERMS_OF_SERVICE(),
        routeName: t("Metadata.terms-of-service.title"),
    }),
});

export default NavbarLayout;
