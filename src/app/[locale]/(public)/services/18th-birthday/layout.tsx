import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { SERVICES_18TH_BIRTHDAY } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: SERVICES_18TH_BIRTHDAY(),
        routeName: t("Metadata.services-18th-birthday.title"),
    }),
});

export default NavbarLayout;
