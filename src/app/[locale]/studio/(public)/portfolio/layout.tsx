import {
    StudioNavbarLayout,
    createInfo,
} from "@/components/layouts";
import { PORTFOLIO } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: PORTFOLIO(),
        routeName: t("Metadata.portfolio.title"),
    }),
});

export default StudioNavbarLayout;
