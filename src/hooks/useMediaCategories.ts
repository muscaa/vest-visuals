"use client";

import {
    useQuery,
    useMutation,
} from "@tanstack/react-query";
import { apiClient } from "@client/http";
import * as types from "@shared/types/api/media/categories";
import * as types_get from "@shared/types/api/media/categories/get";
import * as types_create from "@shared/types/api/media/categories/create";
import * as types_update from "@shared/types/api/media/categories/update";
import * as types_remove from "@shared/types/api/media/categories/remove";

export function useMediaCategories() {
    const useAllMediaCategories = () => useQuery({
        queryKey: ["media/categories"],
        queryFn: async () => {
            const { data } = await apiClient.post<types.PostResponse, types.PostRequest>("/media/categories", {});

            if (!data.success) return [];

            return data.values || [];
        },
    });

    const useMediaCategory = (id: string) => useQuery({
        queryKey: ["media/categories", id],
        queryFn: async () => {
            const { data } = await apiClient.post<types_get.PostResponse, types_get.PostRequest>("/media/categories/get", {
                id,
            });

            if (!data.success) return null;

            return data.value || null;
        },
    });

    const createMediaCategory = useMutation({
        mutationKey: ["media/categories"],
        mutationFn: async (props: types_create.PostRequest) => {
            const { data } = await apiClient.post<types_create.PostResponse, types_create.PostRequest>("/media/categories/create", props);

            if (!data.success) throw new Error(data.error);

            return data.value;
        },
    });

    const updateMediaCategory = useMutation({
        mutationKey: ["media/categories"],
        mutationFn: async (props: types_update.PostRequest) => {
            const { data } = await apiClient.post<types_update.PostResponse, types_update.PostRequest>("/media/categories/update", props);

            if (!data.success) throw new Error(data.error);

            return data.success;
        },
    });

    const removeMediaCategories = useMutation({
        mutationKey: ["media/categories"],
        mutationFn: async (props: types_remove.PostRequest) => {
            const { data } = await apiClient.post<types_remove.PostResponse, types_remove.PostRequest>("/media/categories/remove", props);

            if (!data.success) throw new Error(data.error);

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
