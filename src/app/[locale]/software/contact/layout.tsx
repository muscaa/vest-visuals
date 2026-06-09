import { generate, og } from "@/components/layouts";
import { SoftwareNavbarLayout } from "@/components/software/layout";

export const {
    generateStaticParams,
    generateMetadata,
} = generate({
    metadata: async ({ t }) => ({
        title: t("Software.Metadata.contact.title"),
        description: t("Software.Metadata.contact.description"),
        url: "/contact",
        image: og.splitImage({
            title: t("Software.Metadata.contact.og-title"),
            subtitle: t("Software.Metadata.contact.og-subtitle"),
            image: "/software.jpg",
        }),
    }),
});

export default SoftwareNavbarLayout;
