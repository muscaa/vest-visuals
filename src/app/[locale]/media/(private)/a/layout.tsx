import { defaultMetadata, generate, LocaleLayoutProps, SidebarLayout } from "@/components/layouts";
import { DndContextProvider } from "@/contexts/dnd";
import { isAdmin } from "@server/auth/permissions";
import { getLocale } from "@server/i18n";
import { LOGIN, redirect } from "@shared/i18n";
import { headers } from "next/headers";

export const {
    generateStaticParams,
    generateMetadata,
} = generate({
    metadata: async ({ t }) => defaultMetadata(t, "Media", "a", "/a"),
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
