import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { COOKIE_POLICY } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: COOKIE_POLICY(),
        routeName: t("Metadata.cookie-policy.title"),
    }),
});

export default NavbarLayout;
