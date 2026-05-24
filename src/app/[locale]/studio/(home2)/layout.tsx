import {
    BaseLayout,
    createInfo,
} from "@/components/layout";
import { HOME } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: async ({ t }) => ({
        route: HOME(),
        routeName: t("Metadata.home.title"),
    }),
});

// The redesign is a fully self-contained prototype with its own nav,
// footer, and theme/language toggles — so it uses BaseLayout (no app
// chrome) rather than NavbarLayout, which would double up the nav/footer.
export default BaseLayout;
