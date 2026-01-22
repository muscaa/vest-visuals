"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import * as types from "@type/portfolio/groups";
import * as groups from "@/actions/portfolio/groups";

export function useMediaGroups() {
    const queryClient = useQueryClient();

    const useAllMediaGroups = () => useQuery({
        queryKey: ["media", "groups"],
        queryFn: async () => {
            const [status, result] = await groups.getAll();
            if (status !== "OK") return [];

            return result || [];
        },
    });

    const useMediaGroup = (id: string) => useQuery({
        queryKey: ["media", id],
        queryFn: async () => {
            const [status, result] = await groups.get(id);
            if (status !== "OK") return null;

            return result || null;
        },
    });

    const createMediaGroup = useMutation({
        mutationFn: async (props: types.CreateProps) => {
            const [status, result] = await groups.create(props);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["media"] });

            return result;
        },
    });

    const updateMediaGroup = useMutation({
        mutationFn: async (props: { id: string; value: types.UpdateProps; }) => {
            const [status, result] = await groups.update(props.id, props.value);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["media"] });

            return true;
        },
    });

    const removeMediaGroups = useMutation({
        mutationFn: async (ids: string[]) => {
            const [status, result] = await groups.remove(ids);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["media"] });

            return true;
        },
    });

    return {
        useAllMediaGroups,
        useMediaGroup,
        createMediaGroup,
        updateMediaGroup,
        removeMediaGroups,
    };
}
