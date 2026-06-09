import "@/styles/main.css";
import {
    LocaleLayoutProps,
    BaseLayout,
} from "@/components/layouts";
import { locales } from "@shared/i18n";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export default async function Layout(props: LocaleLayoutProps) {
    const { locale } = await props.params;
    if (!hasLocale(locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return (
        <BaseLayout {...props} />
    );
}
