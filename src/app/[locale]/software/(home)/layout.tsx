import { generate, og } from "@/components/layouts";
import { SoftwareNavbarLayout } from "@/components/layouts/software";

export const {
    generateStaticParams,
    generateMetadata,
} = generate({
    metadata: async ({ t }) => ({
        title: t("Software.Metadata.home.title"),
        description: t("Software.Metadata.home.description"),
        url: "/",
        image: og.splitImage({
            title: t("Software.Metadata.home.og-title"),
            subtitle: t("Software.Metadata.home.og-subtitle"),
            image: "/software.jpg",
        }),
    }),
});

export default SoftwareNavbarLayout;
