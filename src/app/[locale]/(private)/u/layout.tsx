import {
    SidebarLayout,
    LocaleLayoutProps,
    createInfo,
} from "@/components/layout";
import { headers } from "next/headers";
import { auth } from "@server/auth";
import {
    redirect,
    U,
    LOGIN,
} from "@shared/i18n";
import { getLocale } from "@server/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: U(),
        routeName: t("Metadata.user.title"),
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
        <SidebarLayout {...props} />
    );
}
