"use client";

import {
    useQuery,
    useMutation,
} from "@tanstack/react-query";
import { api_routes } from "@/utils/client/axios";

export function useMediaCategories() {
    const getMediaCategories = () => useQuery({
        queryKey: [api_routes.media.categories._.url],
        queryFn: async () => {
            const { data } = await api_routes.media.categories._.post({});

            if (!data.success) return [];

            return data.values || [];
        },
    });

    const getMediaCategory = (id: string) => useQuery({
        queryKey: [api_routes.media.categories.get._.url, id],
        queryFn: async () => {
            const { data } = await api_routes.media.categories.get._.post({
                id,
            });

            if (!data.success) return null;

            return data.value || null;
        },
    });

    const createMediaCategory = useMutation({
        mutationKey: [api_routes.media.categories.create._.url],
        mutationFn: async (category: string) => {
            const { data } = await api_routes.media.categories.create._.post({
                category,
            });

            if (!data.success) throw new Error("Failed to create media category");
            if (!data.value) throw new Error("No media category returned");

            return data.value;
        },
    });

    return {
        getMediaCategories,
        getMediaCategory,
        createMediaCategory,
    };
}
