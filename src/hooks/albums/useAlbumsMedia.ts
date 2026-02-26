"use client";

import {
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import * as types from "@type/albums/media";
import * as media from "@/actions/albums/media";

export function useAlbumsMedia() {
    const queryClient = useQueryClient();

    const useAlbumsMedia = (albumId: string, contentId: string) => useQuery({
        queryKey: ["albums", albumId, contentId],
        queryFn: async () => {
            const [status, result] = await media.get(albumId, contentId);
            if (status !== "OK") return null;

            return result || null;
        },
    });

    return {
        useAlbumsMedia,
    };
}
