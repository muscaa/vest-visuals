"use client";

import { useQuery } from "@tanstack/react-query";
import { api_routes } from "@/utils/client/axios";

export function usePortfolio(category: string) {
    return useQuery({
        queryKey: [api_routes.portfolio._.url, category],
        queryFn: async () => {
            const { data } = await api_routes.portfolio._.post({
                category,
            });

            if (!data.success) return [];

            return data.values || [];
        },
    });
}
