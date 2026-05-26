import {
    StudioNavbarLayout,
    createInfo,
} from "@/components/layouts";
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

export default StudioNavbarLayout;
