import "@/styles/main.css";
import {
    LocaleLayoutProps,
    BaseLayout,
    createInfo,
} from "@/components/layout";
import {
    locales,
    HOME,
} from "@shared/i18n";
import {
    hasLocale,
} from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: HOME(),
        routeName: t("Metadata.home.title"),
    }),
});

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
