import {
    NavbarLayout,
    createInfo,
} from "@/components/layout";
import { LOCATIONS_DROBETA_TURNU_SEVERIN } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: LOCATIONS_DROBETA_TURNU_SEVERIN(),
        routeName: t("Metadata.locations-drobeta-turnu-severin.title"),
    }),
});

export default NavbarLayout;
