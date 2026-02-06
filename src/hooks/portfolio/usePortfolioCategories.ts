"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import * as types from "@type/portfolio/categories";
import * as categories from "@/actions/portfolio/categories";

export function usePortfolioCategories() {
    const queryClient = useQueryClient();

    const useAllPortfolioCategories = () => useQuery({
        queryKey: ["portfolio", "categories"],
        queryFn: async () => {
            const [status, result] = await categories.getAll();
            if (status !== "OK") return [];

            return result || [];
        },
    });

    const usePortfolioCategory = (id: string) => useQuery({
        queryKey: ["portfolio", id],
        queryFn: async () => {
            const [status, result] = await categories.get(id);
            if (status !== "OK") return null;

            return result || null;
        },
    });

    const createPortfolioCategory = useMutation({
        mutationFn: async (props: types.CreateProps) => {
            const [status, result] = await categories.create(props);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["portfolio"] });

            return result;
        },
    });

    const updatePortfolioCategory = useMutation({
        mutationFn: async (props: { id: string; value: types.UpdateProps; }) => {
            const [status, result] = await categories.update(props.id, props.value);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["portfolio"] });

            return true;
        },
    });

    const removePortfolioCategories = useMutation({
        mutationFn: async (ids: string[]) => {
            const [status, result] = await categories.remove(ids);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["portfolio"] });

            return true;
        },
    });

    return {
        useAllPortfolioCategories,
        usePortfolioCategory,
        createPortfolioCategory,
        updatePortfolioCategory,
        removePortfolioCategories,
    };
}
