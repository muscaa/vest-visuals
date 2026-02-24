import {
    NavbarLayout,
    LocaleLayoutProps,
    createInfo,
} from "@/components/layout";
import {
    ALBUMS_$ID_$PATH,
} from "@shared/i18n";
import { get } from "@server/albums/albums";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo<{
    params: Promise<{
        id: string;
        path?: string[];
    }>;
}>({
    metadata: async ({ t, params }) => {
        const { id, path } = await params;

        const album = await get(id);

        return {
            route: ALBUMS_$ID_$PATH(id, path?.map(decodeURIComponent)),
            routeName: album?.title || t("Metadata.albums.title"),
        };
    },
});

export default async function Layout(props: LocaleLayoutProps) {
    return (
        <NavbarLayout {...props} />
    );
}
