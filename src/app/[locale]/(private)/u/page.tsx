"use server";

import { LocaleLayoutProps } from "@/components/layout";
import { getLocale } from "@server/i18n";
import {
    redirect,
    U_ACCOUNT,
} from "@shared/i18n";

export default async function Page(props: LocaleLayoutProps) {
    const locale = await getLocale(props);

    redirect({
        locale,
        href: U_ACCOUNT(),
    });
}
