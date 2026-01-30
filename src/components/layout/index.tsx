import type { Metadata } from "next";
import {
    Inter,
    JetBrains_Mono,
} from "next/font/google";
import ThemeProvider from "../theme/theme-provider";
import { ClientLayout } from "./client";

import "@/styles/main.css";
import { NavbarLayoutProvider } from "./providers/navbar";
import { SidebarLayoutProvider } from "./providers/sidebar";

export interface MetadataProps {
    route: string;
    routeName: string;
}

export function createMetadata(props: MetadataProps): Metadata {
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
        title: `Vest Visuals | ${props.routeName}`,
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
            url: props.route,
            title: `Vest Visuals | ${props.routeName}`,
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
    };
}

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});
export const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

export interface LayoutProps {
    children: React.ReactNode;
}

export function RootLayout(props: LayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} ${jetbrainsMono.variable} antialiased flex flex-col w-screen h-screen`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ClientLayout>
                        {props.children}
                    </ClientLayout>
                </ThemeProvider>
            </body>
        </html>
    );
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
