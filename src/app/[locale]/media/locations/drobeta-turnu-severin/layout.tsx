import { defaultMetadata, generate } from "@/components/layouts";
import { MediaNavbarLayout } from "@/components/media/layout";

export const {
    generateStaticParams,
    generateMetadata,
} = generate({
    metadata: async ({ t }) => defaultMetadata(t, "Media", "locations-drobeta-turnu-severin", "/locations/drobeta-turnu-severin"),
});

export default MediaNavbarLayout;
