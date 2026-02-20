"use client";

import {
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import * as types from "@type/albums/directories";
import * as directories from "@/actions/albums/directories";

export function useAlbumsDirectories() {
    const queryClient = useQueryClient();

    const useAlbumsDirectory = (albumId: string, contentId: string) => useQuery({
        queryKey: ["albums", albumId, contentId],
        queryFn: async () => {
            const [status, result] = await directories.get(albumId, contentId);
            if (status !== "OK") return null;

            return result || null;
        },
    });

    return {
        useAlbumsDirectory,
    };
}
