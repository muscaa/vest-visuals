import {
    StudioNavbarLayout,
    createInfo,
} from "@/components/layouts";
import { CONTACT } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: CONTACT(),
        routeName: t("Metadata.contact.title"),
    }),
});

export default StudioNavbarLayout;
