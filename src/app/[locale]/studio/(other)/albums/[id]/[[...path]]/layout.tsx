import { BaseLayout, generate, og } from "@/components/layouts";
import { getPartial } from "@server/albums/albums";
import { ALBUMS_$ID_$PATH } from "@shared/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = generate<{
    params: Promise<{
        id: string;
        path?: string[];
    }>;
}>({
    metadata: async ({ t, params }) => {
        const { id, path } = await params;

        const album = await getPartial(id);

        return {
            title: album?.title || t("Studio.Metadata.albums.title"),
            description: album?.description || t("Studio.Metadata.albums.description"),
            url: ALBUMS_$ID_$PATH(id, path?.map(decodeURIComponent)),
            image: og.splitImage({
                title: album?.title || t("Studio.Metadata.albums.og-title"),
                subtitle: album?.description || t("Studio.Metadata.albums.og-subtitle"),
                image: album?.coverUrl || "/studio.jpg",
            }),
        };
    },
});

export default BaseLayout;
