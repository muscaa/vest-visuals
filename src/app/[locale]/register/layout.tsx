import {
    NavbarLayout,
    LocaleLayoutProps,
    createInfo,
} from "@/components/layout";
import { headers } from "next/headers";
import { auth } from "@server/auth";
import {
    redirect,
    REGISTER,
    U_ACCOUNT,
} from "@shared/i18n";
import { getLocale } from "@server/i18n";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: REGISTER(),
        routeName: t("register.title"),
    }),
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
        <NavbarLayout {...props} />
    );
}
