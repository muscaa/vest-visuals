"use client";

import { LayoutProps } from "@/components/layouts";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { AuthContextProvider } from "@/contexts/auth";
import { ThemeLayoutProvider } from "./theme";
import { Toaster } from "../ui/sonner";
import { MainContextProvider } from "@/contexts/main";
import { AnalyticsProvider } from "./analytics";

export const queryClient = new QueryClient();

export function ClientProvider(props: LayoutProps) {
    return (
        <MainContextProvider>
            <ThemeLayoutProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <QueryClientProvider client={queryClient}>
                    <AuthContextProvider>
                        {props.children}
                        <Toaster
                            position="bottom-right"
                            richColors
                        />
                    </AuthContextProvider>
                    <AnalyticsProvider />
                </QueryClientProvider>
            </ThemeLayoutProvider>
        </MainContextProvider>
    );
}
