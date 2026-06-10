import { defaultMetadata, generate } from "@/components/layouts";
import { MediaNavbarLayout } from "@/components/media/layout";

export const {
    generateStaticParams,
    generateMetadata,
} = generate({
    metadata: async ({ t }) => defaultMetadata(t, "Media", "locations-oradea", "/locations/oradea"),
});

export default MediaNavbarLayout;
