import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { LOCATIONS_BUCURESTI } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: LOCATIONS_BUCURESTI(),
        routeName: t("Metadata.locations-bucuresti.title"),
    }),
});

export default NavbarLayout;
