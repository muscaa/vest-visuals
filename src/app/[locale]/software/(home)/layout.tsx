import { defaultMetadata, generate } from "@/components/layouts";
import { SoftwareNavbarLayout } from "@/components/software/layout";

export const {
    generateStaticParams,
    generateMetadata,
} = generate({
    metadata: async ({ t }) => defaultMetadata(t, "Software", "home", "/"),
});

export default SoftwareNavbarLayout;
