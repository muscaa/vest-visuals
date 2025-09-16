"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@client/http";
import * as types from "@type/api/portfolio";

export function usePortfolio(category: string) {
    return useQuery({
        queryKey: ["portfolio", category],
        queryFn: async () => {
            const { data } = await apiClient.post<types.PostResponse, types.PostRequest>("/portfolio", {
                category,
            });

            if (!data.success) return [];

            return data.values || [];
        },
    });
}
