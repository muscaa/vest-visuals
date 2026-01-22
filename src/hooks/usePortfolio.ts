"use client";

import { useQuery } from "@tanstack/react-query";
import * as portfolio from "@/actions/portfolio";

export function usePortfolio(category: string) {
    return useQuery({
        queryKey: ["portfolio", category, "media"],
        queryFn: async () => {
            const [status, result] = await portfolio.get(category);
            if (status !== "OK") return [];

            return result || [];
        },
    });
}
