import "@/styles/main.css";
import {
    LayoutProps,
    BaseLayout,
    createInfo,
} from "@/components/layout";
import { HOME } from "@shared/paths";
import {
    hasLocale,
} from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export const {
    generateStaticParams,
    generateMetadata,
} = createInfo({
    metadata: (t) => ({
        route: HOME,
        routeName: "Acasă",
    }),
});

interface Props extends LayoutProps {
    params: Promise<{ locale: string; }>;
}

export default async function Layout(props: Props) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await props.params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <BaseLayout>
            {props.children}
        </BaseLayout>
    );
}
