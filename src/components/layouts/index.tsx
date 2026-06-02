import type { Metadata } from "next";
import { NavbarLayout } from "./navbar";
import { SidebarLayout } from "./sidebar";
import { getTranslations } from "next-intl/server";
import {
    _Translator,
} from "next-intl";
import { locales } from "@shared/i18n";
import { Navbar } from "../navbar";
import {
    HOME,
    CONTACT,
    SERVICES_WEDDING,
    SERVICES_CHRISTENING,
    SERVICES_18TH_BIRTHDAY,
    SERVICES_OUTDOOR,
    SERVICES_REAL_ESTATE,
    SERVICES_AUTOMOTIVE,
    SERVICES_MARKETING,
} from "@shared/i18n";
import { Footer } from "../footer";

export type MetadataProps<T> = T & {
    t: _Translator<Record<string, any>, never>;
};

export interface MetadataResult {
    route: string;
    routeName: string;
    openGraph?: {
        description?: string;
        image?: {
            url?: string;
            width?: number;
            height?: number;
            alt?: string;
        };
    };
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
                    description: meta.openGraph?.description ?? "Servicii profesionale de fotografie și videografie în Timișoara, Arad și Oradea.",
                    images: [
                        {
                            url: meta.openGraph?.image?.url ?? "opengraph-image.jpg",
                            width: meta.openGraph?.image?.width ?? 1200,
                            height: meta.openGraph?.image?.height ?? 630,
                            alt: meta.openGraph?.image?.alt ?? "OpenGraph Image",
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

export { SidebarLayout };

export function StudioNavbarLayout(props: LayoutProps) {
    return (
        <NavbarLayout
            nav={
                <Navbar
                    entries={[
                        {
                            text: "ACASA",
                            to: HOME(),
                        },
                        {
                            text: "EVENIMENTE",
                            entries: [
                                {
                                    text: "MAJORAT",
                                    to: SERVICES_18TH_BIRTHDAY(),
                                },
                                {
                                    text: "NUNTA",
                                    to: SERVICES_WEDDING(),
                                },
                                {
                                    text: "BOTEZ",
                                    to: SERVICES_CHRISTENING(),
                                },
                                // {
                                //     text: "ANIVERSARE",
                                //     to: CONTACT(),
                                // },
                                // {
                                //     text: "BUSINESS / CORPORATE",
                                //     to: CONTACT(),
                                // },
                            ],
                        },
                        {
                            text: "PORTRETE",
                            entries: [
                                // {
                                //     text: "PORTRETE OFICIALE",
                                //     to: CONTACT(),
                                // },
                                // {
                                //     text: "ALBUME ABSOLVIRE",
                                //     to: CONTACT(),
                                // },
                                // {
                                //     text: "MATERNITATE",
                                //     to: CONTACT(),
                                // },
                                // {
                                //     text: "NOU-NASCUTI",
                                //     to: CONTACT(),
                                // },
                                // {
                                //     text: "STUDIO",
                                //     to: CONTACT(),
                                // },
                                {
                                    text: "SEDINTA FOTO", // LUMINA NATURALA (OUTDOOR)
                                    to: SERVICES_OUTDOOR(),
                                },
                            ],
                        },
                        {
                            text: "COMERCIAL",
                            entries: [
                                {
                                    text: "IMOBILIARE (REAL ESTATE)",
                                    to: SERVICES_REAL_ESTATE(),
                                },
                                {
                                    text: "AUTOMOTIVE",
                                    to: SERVICES_AUTOMOTIVE(),
                                },
                                // {
                                //     text: "PRODUSE E-COMMERCE",
                                //     to: CONTACT(),
                                // },
                                {
                                    text: "PROMOVARE FIRME (MARKETING)",
                                    to: SERVICES_MARKETING(),
                                },
                            ],
                        },
                        // {
                        //     text: "PORTOFOLIU",
                        //     to: PORTFOLIO(),
                        // },
                        {
                            text: "CONTACT",
                            to: CONTACT(),
                        },
                    ]}
                />
            }
        >
            {props.children}
        </NavbarLayout>
    );
}

export function SoftwareNavbarLayout(props: LayoutProps) {
    return (
        <NavbarLayout
            nav={
                <Navbar
                    entries={[
                        {
                            text: "HOME",
                            to: "/",
                        },
                        {
                            text: "SERVICES",
                            entries: [
                                {
                                    text: "Web Apps",
                                    to: "/",
                                },
                                {
                                    text: "Mobile Apps",
                                    to: "/",
                                },
                                {
                                    text: "Dashboards & Dataviz",
                                    to: "/",
                                },
                                {
                                    text: "Design Systems",
                                    to: "/",
                                },
                                {
                                    text: "AI integrations",
                                    to: "/",
                                },
                                {
                                    text: "Internal Tools",
                                    to: "/",
                                },
                                {
                                    text: "E-commerce",
                                    to: "/",
                                },
                                {
                                    text: "Platform engineering",
                                    to: "/",
                                },
                            ],
                        },
                        {
                            text: "CONTACT",
                            to: "/contact",
                        },
                    ]}
                />
            }
            footer={
                <Footer
                    sections={[
                        {
                            title: "Legal",
                            links: [
                                {
                                    name: "Termeni si conditii",
                                    to: "/terms-of-service",
                                },
                                {
                                    name: "Politica de confidentialitate",
                                    to: "/privacy-policy",
                                },
                                {
                                    name: "Politica de cookie-uri",
                                    to: "/cookie-policy",
                                },
                            ],
                        }
                    ]}
                />
            }
        >
            {props.children}
        </NavbarLayout>
    );
}
