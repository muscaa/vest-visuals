"use client";

import {
    useQuery,
    useMutation,
} from "@tanstack/react-query";
import { apiClient } from "@client/http";
import * as types from "@type/api/media/groups";
import * as types_get from "@type/api/media/groups/get";
import * as types_create from "@type/api/media/groups/create";
import * as types_update from "@type/api/media/groups/update";
import * as types_remove from "@type/api/media/groups/remove";

export function useMediaGroups() {
    const useAllMediaGroups = () => useQuery({
        queryKey: ["media/groups"],
        queryFn: async () => {
            const { data } = await apiClient.post<types.PostResponse, types.PostRequest>("/media/groups", {});

            if (!data.success) return [];

            return data.values || [];
        },
    });

    const useMediaGroup = (id: string) => useQuery({
        queryKey: ["media/groups", id],
        queryFn: async () => {
            const { data } = await apiClient.post<types_get.PostResponse, types_get.PostRequest>("/media/groups/get", {
                id,
            });

            if (!data.success) return null;

            return data.value || null;
        },
    });

    const createMediaGroup = useMutation({
        mutationKey: ["media/groups"],
        mutationFn: async (props: types_create.PostRequest) => {
            const { data } = await apiClient.post<types_create.PostResponse, types_create.PostRequest>("/media/groups/create", props);

            if (!data.success) throw new Error(data.error);

            return data.value;
        },
    });

    const updateMediaGroup = useMutation({
        mutationKey: ["media/groups"],
        mutationFn: async (props: types_update.PostRequest) => {
            const { data } = await apiClient.post<types_update.PostResponse, types_update.PostRequest>("/media/groups/update", props);

            if (!data.success) throw new Error(data.error);

            return data.success;
        },
    });

    const removeMediaGroups = useMutation({
        mutationKey: ["media/groups"],
        mutationFn: async (props: types_remove.PostRequest) => {
            const { data } = await apiClient.post<types_remove.PostResponse, types_remove.PostRequest>("/media/groups/remove", props);

            if (!data.success) throw new Error(data.error);

            return data.success;
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
