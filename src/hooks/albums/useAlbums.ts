"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import * as types from "@type/albums/albums";
import * as albums from "@/actions/albums/albums";

export function useAlbums() {
    const queryClient = useQueryClient();

    const useAllAlbums = () => useQuery({
        queryKey: ["albums"],
        queryFn: async () => {
            const [status, result] = await albums.getAll();
            if (status !== "OK") return [];

            return result || [];
        },
    });

    const usePartialAlbum = (id: string) => useQuery({
        queryKey: ["albums", id],
        queryFn: async () => {
            const [status, result] = await albums.getPartial(id);
            if (status !== "OK") return null;

            return result || null;
        },
    });

    const createAlbum = useMutation({
        mutationFn: async (props: types.CreateProps) => {
            const [status, result] = await albums.create(props);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["albums"] });

            return result;
        },
    });

    const updateAlbum = useMutation({
        mutationFn: async (props: { id: string; value: types.UpdateProps; }) => {
            const [status, result] = await albums.update(props.id, props.value);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["albums"] });

            return true;
        },
    });

    const removeAlbum = useMutation({
        mutationFn: async (id: string) => {
            const [status, result] = await albums.remove(id);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["albums"] });

            return true;
        },
    });

    return {
        useAllAlbums,
        usePartialAlbum,
        createAlbum,
        updateAlbum,
        removeAlbum,
    };
}
