import { generate, og } from "@/components/layouts";
import { SoftwareNavbarLayout } from "@/components/layouts/software";

export const {
    generateStaticParams,
    generateMetadata,
} = generate({
    metadata: async ({ t }) => ({
        title: t("Software.Metadata.contact.title"),
        description: t("Software.Metadata.contact.description"),
        url: "/",
        image: og.splitImage({
            title: t("Software.Metadata.contact.og-title"),
            subtitle: t("Software.Metadata.contact.og-subtitle"),
            image: "/software.png",
        }),
    }),
});

export default SoftwareNavbarLayout;
