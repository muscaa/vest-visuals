"use client";

import {
    useQuery,
    useMutation,
} from "@tanstack/react-query";
import { api_routes } from "@/utils/client/axios";
import * as types_create from "@/types/api/media/categories/create";
import * as types_update from "@/types/api/media/categories/update";
import * as types_remove from "@/types/api/media/categories/remove";

export function useMediaCategories() {
    const useAllMediaCategories = () => useQuery({
        queryKey: [api_routes.media.categories._.url],
        queryFn: async () => {
            const { data } = await api_routes.media.categories._.post({});

            if (!data.success) return [];

            return data.values || [];
        },
    });

    const useMediaCategory = (id: string) => useQuery({
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
        mutationFn: async (props: types_create.PostRequest) => {
            const { data } = await api_routes.media.categories.create._.post(props);

            if (!data.success) throw new Error("Failed to create media category");
            if (!data.value) throw new Error("No media category returned");

            return data.value;
        },
    });

    const updateMediaCategory = useMutation({
        mutationKey: [api_routes.media.categories.update._.url],
        mutationFn: async (props: types_update.PostRequest) => {
            const { data } = await api_routes.media.categories.update._.post(props);

            if (!data.success) throw new Error("Failed to update media category");

            return data.success;
        },
    });

    const removeMediaCategories = useMutation({
        mutationKey: [api_routes.media.categories.remove._.url],
        mutationFn: async (props: types_remove.PostRequest) => {
            const { data } = await api_routes.media.categories.remove._.post(props);

            if (!data.success) throw new Error("Failed to remove media category");

            return data.success;
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
