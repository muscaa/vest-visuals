"use client";

import { LayoutProps } from "@/components/layout";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

export const queryClient = new QueryClient();

export function ClientLayout(props: LayoutProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    );
}
