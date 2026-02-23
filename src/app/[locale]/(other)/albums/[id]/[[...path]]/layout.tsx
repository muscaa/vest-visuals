import {
    NavbarLayout,
    LocaleLayoutProps,
    createInfo,
} from "@/components/layout";
import { headers } from "next/headers";
import { auth } from "@server/auth";
import {
    redirect,
    LOGIN,
    ALBUMS_$ID_$PATH,
} from "@shared/i18n";
import { getLocale } from "@server/i18n";
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
    const locale = await getLocale(props);

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect({
            locale,
            href: LOGIN(),
        });
    }

    return (
        <NavbarLayout {...props} />
    );
}
