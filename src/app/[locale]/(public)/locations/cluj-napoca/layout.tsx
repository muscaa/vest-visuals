import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { LOCATIONS_CLUJ_NAPOCA } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: LOCATIONS_CLUJ_NAPOCA(),
        routeName: t("Metadata.locations-cluj-napoca.title"),
    }),
});

export default NavbarLayout;
