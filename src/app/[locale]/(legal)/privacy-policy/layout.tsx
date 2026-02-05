import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { PRIVACY_POLICY } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: PRIVACY_POLICY(),
        routeName: t("Metadata.privacy-policy.title"),
    }),
});

export default NavbarLayout;
