"use client";

import { LayoutProps } from "@/components/layout";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { AuthContextProvider } from "@/contexts/auth";
import { ThemeLayoutProvider } from "./providers/theme";
import { Toaster } from "../ui/sonner";

export const queryClient = new QueryClient();

export function ClientLayout(props: LayoutProps) {
    return (
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
            </QueryClientProvider>
        </ThemeLayoutProvider>
    );
}
