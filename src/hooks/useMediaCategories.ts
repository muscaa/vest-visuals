"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import * as types from "@type/portfolio/categories";
import * as categories from "@/actions/portfolio/categories";

export function useMediaCategories() {
    const queryClient = useQueryClient();

    const useAllMediaCategories = () => useQuery({
        queryKey: ["media", "categories"],
        queryFn: async () => {
            const [status, result] = await categories.getAll();
            if (status !== "OK") return [];

            return result || [];
        },
    });

    const useMediaCategory = (id: string) => useQuery({
        queryKey: ["media", id],
        queryFn: async () => {
            const [status, result] = await categories.get(id);
            if (status !== "OK") return null;

            return result || null;
        },
    });

    const createMediaCategory = useMutation({
        mutationFn: async (props: types.CreateProps) => {
            const [status, result] = await categories.create(props);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["media"] });

            return result;
        },
    });

    const updateMediaCategory = useMutation({
        mutationFn: async (props: { id: string; value: types.UpdateProps; }) => {
            const [status, result] = await categories.update(props.id, props.value);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["media"] });

            return true;
        },
    });

    const removeMediaCategories = useMutation({
        mutationFn: async (ids: string[]) => {
            const [status, result] = await categories.remove(ids);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["media"] });

            return true;
        },
    });

    return {
        useAllMediaCategories,
        useMediaCategory,
        createMediaCategory,
        updateMediaCategory,
        removeMediaCategories,
    };
}
