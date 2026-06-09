import { defaultMetadata, generate, LocaleLayoutProps } from "@/components/layouts";
import { StudioNavbarLayout } from "@/components/studio/layout";
import { auth } from "@server/auth";
import { getLocale } from "@server/i18n";
import { redirect, U_ACCOUNT } from "@shared/i18n";
import { headers } from "next/headers";

export const {
    generateStaticParams,
    generateMetadata,
} = generate({
    metadata: async ({ t }) => defaultMetadata(t, "Studio", "login", "/login"),
});

export default async function Layout(props: LocaleLayoutProps) {
    const locale = await getLocale(props);

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        redirect({
            locale,
            href: U_ACCOUNT(),
        });
    }

    return (
        <StudioNavbarLayout {...props} />
    );
}
