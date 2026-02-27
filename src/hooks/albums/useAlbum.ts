"use client";

import { useQuery } from "@tanstack/react-query";
import { getAlbum } from "@/actions/albums";

export function useAlbum(id: string) {
    return useQuery({
        queryKey: ["albums", id],
        queryFn: async () => {
            const [status, result] = await getAlbum(id);
            if (status !== "OK") return null;

            return result || null;
        },
    });
}
