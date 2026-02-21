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
    ALBUMS,
} from "@shared/i18n";
import { getLocale } from "@server/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: ALBUMS(),
        routeName: t("Metadata.albums.title"),
    }),
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
