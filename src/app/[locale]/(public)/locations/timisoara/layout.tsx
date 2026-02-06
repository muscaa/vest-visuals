import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { LOCATIONS_TIMISOARA } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: LOCATIONS_TIMISOARA(),
        routeName: t("Metadata.locations-timisoara.title"),
    }),
});

export default NavbarLayout;
