import type { Metadata } from "next";
import { NavbarLayoutProvider } from "./providers/navbar";
import { SidebarLayoutProvider } from "./providers/sidebar";
import { getTranslations } from "next-intl/server";
import {
    _Translator,
} from "next-intl";
import { locales } from "@shared/i18n";

export type MetadataProps<T> = T & {
    t: _Translator<Record<string, any>, never>;
};

export interface MetadataResult {
    route: string;
    routeName: string;
}

export interface InfoProps<T> {
    metadata: (props: MetadataProps<T>) => Promise<MetadataResult>;
}

export interface Info {
    generateStaticParams: () => { locale: string; }[];
    generateMetadata: (props: LocaleLayoutProps) => Promise<Metadata>;
}

export function createInfo<T>(info: InfoProps<T>): Info {
    return {
        generateStaticParams: () => locales.map((locale) => ({ locale })),
        generateMetadata: async (props) => {
            const { locale } = await props.params;
            const t = await getTranslations({ locale });

            const meta = await info.metadata({
                ...props,
                t,
            } as unknown as MetadataProps<T>); // TODO improve this

            return {
                applicationName: "Vest Visuals",
                metadataBase: new URL("https://vestvisuals.ro/"),
                authors: [{ name: "muscaa", url: "https://github.com/muscaa" }],
                creator: "muscaa",
                publisher: "muscaa",
                robots: {
                    index: true,
                    follow: true,
                },
                title: `Vest Visuals | ${meta.routeName}`,
                description: "Servicii profesionale de fotografie și videografie în Timișoara, Arad și Oradea.", // TODO
                keywords: [
                    // english
                    "photography studio", "videography studio", "photo studio", "video production", "event photography",
                    "wedding photography", "commercial videography", "portrait photography", "product photography", "fashion photography",
                    "creative video", "cinematic video", "drone photography", "videographer", "photographer",

                    // romanian
                    "studio foto", "studio video", "fotograf profesionist", "videograf profesionist", "fotograf evenimente",
                    "fotograf nuntă", "videograf nuntă", "studio foto video", "servicii foto video", "fotografie de portret",
                    "fotografie comercială", "fotografie de produs", "fotograf Timișoara", "fotograf Arad", "fotograf Oradea",
                    "videograf Timișoara", "videograf Arad", "videograf Oradea",
                ],
                openGraph: {
                    siteName: "Vest Visuals",
                    url: meta.route,
                    title: `Vest Visuals | ${meta.routeName}`,
                    description: "Servicii profesionale de fotografie și videografie în Timișoara, Arad și Oradea.",
                    images: [
                        {
                            url: "opengraph-image.jpg",
                            width: 1200,
                            height: 630,
                            alt: "OpenGraph Image",
                        },
                    ],
                    locale: "ro_RO",
                    type: "website",
                },
            }
        },
    };
}

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

export function NavbarLayout(props: LayoutProps) {
    return (
        <NavbarLayoutProvider>
            <BaseLayout {...props} />
        </NavbarLayoutProvider>
    );
}

export function SidebarLayout(props: LayoutProps) {
    return (
        <SidebarLayoutProvider>
            <BaseLayout {...props} />
        </SidebarLayoutProvider>
    );
}
