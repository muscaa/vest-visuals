import { defaultMetadata, generate } from "@/components/layouts";
import { StudioNavbarLayout } from "@/components/studio/layout";

export const {
    generateStaticParams,
    generateMetadata,
} = generate({
    metadata: async ({ t }) => defaultMetadata(t, "Studio", "locations-drobeta-turnu-severin", "/locations/drobeta-turnu-severin"),
});

export default StudioNavbarLayout;
