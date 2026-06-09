import { generate, og } from "@/components/layouts";
import { StudioNavbarLayout } from "@/components/studio/layout";

export const {
    generateStaticParams,
    generateMetadata,
} = generate({
    metadata: async ({ t }) => ({
        title: t("Studio.Metadata.home.title"),
        description: t("Studio.Metadata.home.description"),
        url: "/",
        image: og.splitImage({
            title: t("Studio.Metadata.home.og-title"),
            subtitle: t("Studio.Metadata.home.og-subtitle"),
            image: "/studio.jpg",
        }),
    }),
});

export default StudioNavbarLayout;
