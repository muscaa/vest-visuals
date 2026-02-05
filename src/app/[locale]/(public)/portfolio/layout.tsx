import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { PORTFOLIO } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: PORTFOLIO(),
        routeName: t("portfolio.title"),
    }),
});

export default NavbarLayout;
