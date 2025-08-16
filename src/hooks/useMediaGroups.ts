"use client";

import {
    useQuery,
    useMutation,
} from "@tanstack/react-query";
import { api_routes } from "@/utils/client/axios";

export function useMediaCategories() {
    const getMediaGroups = () => useQuery({
        queryKey: [api_routes.media.groups._.url],
        queryFn: async () => {
            const { data } = await api_routes.media.groups._.post({});

            if (!data.success) return [];

            return data.values || [];
        },
    });

    const getMediaGroup = (id: string) => useQuery({
        queryKey: [api_routes.media.groups.get._.url, id],
        queryFn: async () => {
            const { data } = await api_routes.media.groups.get._.post({
                id,
            });

            if (!data.success) return [];

            return data.value || [];
        },
    });
}
