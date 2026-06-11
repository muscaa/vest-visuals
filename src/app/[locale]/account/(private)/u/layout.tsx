import { defaultMetadata, generate, LocaleLayoutProps, SidebarLayout } from "@/components/layouts";
import { auth } from "@server/auth";
import { getLocale } from "@server/i18n";
import { LOGIN, redirect } from "@shared/i18n";
import { headers } from "next/headers";

export const {
    generateStaticParams,
    generateMetadata,
} = generate({
    metadata: async ({ t }) => defaultMetadata(t, "Media", "u", "/u"),
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
