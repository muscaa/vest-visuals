"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import * as types from "@type/portfolio/groups";
import * as groups from "@/actions/portfolio/groups";

export function usePortfolioGroups() {
    const queryClient = useQueryClient();

    const useAllPortfolioGroups = () => useQuery({
        queryKey: ["portfolio", "groups"],
        queryFn: async () => {
            const [status, result] = await groups.getAll();
            if (status !== "OK") return [];

            return result || [];
        },
    });

    const usePortfolioGroup = (id: string) => useQuery({
        queryKey: ["portfolio", id],
        queryFn: async () => {
            const [status, result] = await groups.get(id);
            if (status !== "OK") return null;

            return result || null;
        },
    });

    const createPortfolioGroup = useMutation({
        mutationFn: async (props: types.CreateProps) => {
            const [status, result] = await groups.create(props);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["portfolio"] });

            return result;
        },
    });

    const updatePortfolioGroup = useMutation({
        mutationFn: async (props: { id: string; value: types.UpdateProps; }) => {
            const [status, result] = await groups.update(props.id, props.value);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["portfolio"] });

            return true;
        },
    });

    const removePortfolioGroups = useMutation({
        mutationFn: async (ids: string[]) => {
            const [status, result] = await groups.remove(ids);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["portfolio"] });

            return true;
        },
    });

    return {
        useAllPortfolioGroups,
        usePortfolioGroup,
        createPortfolioGroup,
        updatePortfolioGroup,
        removePortfolioGroups,
    };
}
