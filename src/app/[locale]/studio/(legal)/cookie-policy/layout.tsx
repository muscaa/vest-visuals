import {
    StudioNavbarLayout,
    createInfo,
} from "@/components/layouts";
import { COOKIE_POLICY } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: COOKIE_POLICY(),
        routeName: t("Metadata.cookie-policy.title"),
    }),
});

export default StudioNavbarLayout;
