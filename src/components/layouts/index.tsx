import type { Metadata } from "next";
import {
    locales,
    Pathname,
} from "@shared/i18n";
import { _Translator } from "next-intl";
import { getTranslations } from "next-intl/server";
import { sharedConfig } from "@shared/config";
import { SidebarLayout } from "./sidebar";

export type MetadataProps<T> = T & {
    t: _Translator<Record<string, any>, never>;
};

export interface MetadataResult {
    title: string;
    description: string;
    url: Pathname;
    image: string;
}

export interface Generator<M> {
    metadata: (props: MetadataProps<M>) => Promise<MetadataResult>;
}

export interface GeneratorResult {
    generateStaticParams: () => { locale: string; }[];
    generateMetadata: (props: LocaleLayoutProps) => Promise<Metadata>;
}

export function generate<M>(gen: Generator<M>): GeneratorResult {
    return {
        generateStaticParams: () => locales.map((locale) => ({ locale })),
        generateMetadata: async (props) => {
            const { locale } = await props.params;
            const t = await getTranslations({ locale });

            const metadata = await gen.metadata({
                ...props,
                t,
            } as unknown as MetadataProps<M>);

            return {
                applicationName: "Vest Visuals",
                metadataBase: new URL(sharedConfig.env.URL),
                authors: [{ name: "muscaa", url: "https://github.com/muscaa" }],
                creator: "muscaa",
                publisher: "muscaa",
                robots: {
                    index: true,
                    follow: true,
                },
                title: `Vest Visuals | ${metadata.title}`,
                description: metadata.description,
                openGraph: {
                    siteName: "Vest Visuals",
                    url: metadata.url,
                    title: `Vest Visuals | ${metadata.title}`,
                    description: metadata.description,
                    images: [
                        {
                            url: metadata.image,
                            alt: `Vest Visuals | ${metadata.title} OpenGraph Image`,
                            width: 1200,
                            height: 630,
                        },
                    ],
                    locale: locale,
                    type: "website",
                },
            }
        },
    };
}

export function defaultMetadata(t: _Translator<Record<string, any>, never>, type: "Studio" | "Software", name: string, url: Pathname): MetadataResult {
    return {
        title: t(`${type}.Metadata.${name}.title`),
        description: t(`${type}.Metadata.${name}.description`),
        url,
        image: og.splitImage({
            title: t(`${type}.Metadata.${name}.og-title`),
            subtitle: t(`${type}.Metadata.${name}.og-subtitle`),
            image: type == "Studio" ? "/studio.jpg" : type == "Software" ? "/software.jpg" : "/placeholder.jpg",
        }),
    };
}

function buildPath(basePath: string, params: Record<string, any>) {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null && value !== "") {
            searchParams.append(key, value);
        }
    }

    const query = searchParams.toString();
    return query ? `${basePath}?${query}` : basePath;
}

interface SplitImageProps {
    light?: boolean;
    title?: string;
    subtitle?: string;
    logo?: string;
    image?: string;
}

export const og = {
    splitImage: (props: SplitImageProps) => buildPath("/api/og/split-image", props),
};

export interface LayoutProps {
    children: React.ReactNode;
}

export interface LocaleLayoutProps extends LayoutProps {
    params: Promise<{
        locale: string;
    }>;
}

export function BaseLayout(props: LayoutProps) {
    return (
        <>
            {props.children}
        </>
    );
}

export { SidebarLayout };
