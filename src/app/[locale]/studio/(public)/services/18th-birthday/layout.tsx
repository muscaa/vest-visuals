import {
    StudioNavbarLayout,
    createInfo,
} from "@/components/layouts";
import { SERVICES_18TH_BIRTHDAY } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: SERVICES_18TH_BIRTHDAY(),
        routeName: t("Metadata.services-18th-birthday.title"),
    }),
});

export default StudioNavbarLayout;
