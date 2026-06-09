import { defaultMetadata, generate } from "@/components/layouts";
import { StudioNavbarLayout } from "@/components/studio/layout";

export const {
    generateStaticParams,
    generateMetadata,
} = generate({
    metadata: async ({ t }) => defaultMetadata(t, "Studio", "services-marketing", "/services/marketing"),
});

export default StudioNavbarLayout;
