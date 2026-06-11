import { defaultMetadata, generate } from "@/components/layouts";
import { MediaNavbarLayout } from "@/components/media/layout";

export const {
    generateStaticParams,
    generateMetadata,
} = generate({
    metadata: async ({ t }) => defaultMetadata(t, "Media", "services-christening", "/services/christening"),
});

export default MediaNavbarLayout;
