"use client";

import { LayoutProps } from "@/components/layout";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { AuthContextProvider } from "@/contexts/auth";
import { Toaster } from "../ui/sonner";

export const queryClient = new QueryClient();

export function ClientLayout(props: LayoutProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                {props.children}
                <Toaster
                    position="bottom-right"
                    richColors
                />
            </AuthContextProvider>
        </QueryClientProvider>
    );
}
