import {
    LocaleLayoutProps,
    SidebarLayout,
    createInfo,
} from "@/components/layout";
import { headers } from "next/headers";
import { isAdmin } from "@server/auth/permissions";
import { DndContextProvider } from "@/contexts/dnd";
import {
    redirect,
    A,
    LOGIN,
} from "@shared/i18n";
import { getLocale } from "@server/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: A(),
        routeName: "Admin",
    }),
});

export default async function Layout(props: LocaleLayoutProps) {
    const locale = await getLocale(props);

    const admin = await isAdmin({
        headers: await headers(),
    });

    if (!admin) {
        redirect({
            locale,
            href: LOGIN(),
        });
    }

    return (
        <DndContextProvider>
            <SidebarLayout {...props} />
        </DndContextProvider>
    );
}
