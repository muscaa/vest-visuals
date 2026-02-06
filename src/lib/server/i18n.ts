import {
    getRequestConfig,
    setRequestLocale,
} from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@shared/i18n";
import { LocaleLayoutProps } from "@/components/layout";

export async function getLocale(props: LocaleLayoutProps) {
    const { locale } = await props.params;
    setRequestLocale(locale);
    return locale;
}

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    return {
        locale,
        messages: (await import(`../../../messages/${locale}.json`)).default
    };
});
