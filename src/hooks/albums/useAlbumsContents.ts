"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import * as types from "@type/albums/contents";
import * as contents from "@/actions/albums/contents";

export function useAlbumsContents() {
    const queryClient = useQueryClient();

    const useAllAlbumsContents = () => useQuery({
        queryKey: ["albums", "contents"],
        queryFn: async () => {
            const [status, result] = await contents.getAll();
            if (status !== "OK") return [];

            return result || [];
        },
    });

    const useAlbumsContent = (id: string) => useQuery({
        queryKey: ["albums", id],
        queryFn: async () => {
            const [status, result] = await contents.get(id);
            if (status !== "OK") return null;

            return result || null;
        },
    });

    const useAlbumsContentByPath = (path: string) => useQuery({
        queryKey: ["albums", path],
        queryFn: async () => {
            const [status, result] = await contents.getByPath(path);
            if (status !== "OK") return null;

            return result || null;
        },
    });

    const createAlbumsContent = useMutation({
        mutationFn: async (props: types.CreateProps) => {
            const [status, result] = await contents.create(props);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["albums"] });

            return result;
        },
    });

    const updateAlbumsContent = useMutation({
        mutationFn: async (props: { id: string; value: types.UpdateProps; }) => {
            const [status, result] = await contents.update(props.id, props.value);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["albums"] });

            return true;
        },
    });

    const removeAlbumsContent = useMutation({
        mutationFn: async (id: string) => {
            const [status, result] = await contents.remove(id);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["albums"] });

            return true;
        },
    });

    return {
        useAllAlbumsContents,
        useAlbumsContent,
        createAlbumsContent,
        updateAlbumsContent,
        removeAlbumsContent,
    };
}
