import {
    StudioNavbarLayout,
    createInfo,
} from "@/components/layouts";
import { PRIVACY_POLICY } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: PRIVACY_POLICY(),
        routeName: t("Metadata.privacy-policy.title"),
    }),
});

export default StudioNavbarLayout;
