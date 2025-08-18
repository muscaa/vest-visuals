"use client";

import {
    useQuery,
    useMutation,
} from "@tanstack/react-query";
import { api_routes } from "@/utils/client/axios";
import * as types_create from "@/types/api/media/groups/create";
import * as types_update from "@/types/api/media/groups/update";
import * as types_remove from "@/types/api/media/groups/remove";

export function useMediaGroups() {
    const useAllMediaGroups = () => useQuery({
        queryKey: [api_routes.media.groups._.url],
        queryFn: async () => {
            const { data } = await api_routes.media.groups._.post({});

            if (!data.success) return [];

            return data.values || [];
        },
    });

    const useMediaGroup = (id: string) => useQuery({
        queryKey: [api_routes.media.groups.get._.url, id],
        queryFn: async () => {
            const { data } = await api_routes.media.groups.get._.post({
                id,
            });

            if (!data.success) return null;

            return data.value || null;
        },
    });

    const createMediaGroup = useMutation({
        mutationKey: [api_routes.media.groups.create._.url],
        mutationFn: async (props: types_create.PostRequest) => {
            const { data } = await api_routes.media.groups.create._.post(props);

            if (!data.success) throw new Error(data.message);

            return data.value;
        },
    });

    const updateMediaGroup = useMutation({
        mutationKey: [api_routes.media.groups.update._.url],
        mutationFn: async (props: types_update.PostRequest) => {
            const { data } = await api_routes.media.groups.update._.post(props);

            if (!data.success) throw new Error(data.message);

            return data.success;
        },
    });

    const removeMediaGroups = useMutation({
        mutationKey: [api_routes.media.groups.remove._.url],
        mutationFn: async (props: types_remove.PostRequest) => {
            const { data } = await api_routes.media.groups.remove._.post(props);

            if (!data.success) throw new Error(data.message);

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
