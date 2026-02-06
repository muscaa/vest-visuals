import "@/styles/main.css";
import {
    Inter,
    JetBrains_Mono,
} from "next/font/google";
import { LayoutProps } from "@/components/layout";
import { NextIntlClientProvider } from "next-intl";
import { ClientLayout } from "@/components/layout/client";

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});
export const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

export default async function RootLayout(props: LayoutProps) {
    return (
        <html
            suppressHydrationWarning
        >
            <body
                className={`${inter.className} ${jetbrainsMono.variable} antialiased flex flex-col w-screen h-screen`}
            >
                <NextIntlClientProvider>
                    <ClientLayout>
                        {props.children}
                    </ClientLayout>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
