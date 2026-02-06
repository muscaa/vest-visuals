"use client";

import { useQuery } from "@tanstack/react-query";
import * as portfolio from "@/actions/portfolio";

export function usePortfolio(tag: string) {
    return useQuery({
        queryKey: ["portfolio", tag],
        queryFn: async () => {
            const [status, result] = await portfolio.get(tag);
            if (status !== "OK") return [];

            return result || [];
        },
    });
}
