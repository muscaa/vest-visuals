import {
    BaseLayout,
    createInfo,
} from "@/components/layouts";
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

// The software home is a fully self-contained design with its own sticky
// nav, theme toggle, and footer — so it uses BaseLayout (no app chrome)
// rather than NavbarLayout, which would double up nav + footer.
export default BaseLayout;
