"use client";

import { LayoutProps } from "@/components/layout";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { AuthContextProvider } from "@/contexts/auth";

export const queryClient = new QueryClient();

export function ClientLayout(props: LayoutProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                {props.children}
            </AuthContextProvider>
        </QueryClientProvider>
    );
}
