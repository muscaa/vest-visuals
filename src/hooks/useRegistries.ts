"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "@client/http";
import * as types_team from "@type/api/registries/team";
import * as types_portfolio from "@type/api/registries/portfolio";

export function useRegistries() {
    const queryClient = useQueryClient();

    const useTeamRegistry = () => useQuery({
        queryKey: ["team-reg"],
        queryFn: async () => {
            const { data } = await apiClient.post<types_team.PostResponse, types_team.PostRequest>("/registries/team", {});
            if (!data.success) return undefined;

            return data.value;
        },
    });

    const usePortfolioRegistry = () => useQuery({
        queryKey: ["portfolio-reg"],
        queryFn: async () => {
            const { data } = await apiClient.post<types_portfolio.PostResponse, types_portfolio.PostRequest>("/registries/portfolio", {});
            if (!data.success) return undefined;

            return data.value;
        },
    });

    return {
        useTeamRegistry,
        usePortfolioRegistry,
    };
}
