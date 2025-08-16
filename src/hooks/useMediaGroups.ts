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

            if (!data.success) return null;

            return data.value || null;
        },
    });

    const createMediaGroup = useMutation({
        mutationKey: [api_routes.media.groups.create._.url],
        mutationFn: async (props: types_create.PostRequest) => {
            const { data } = await api_routes.media.groups.create._.post(props);

            if (!data.success) throw new Error("Failed to create media group");
            if (!data.value) throw new Error("No media group returned");

            return data.value;
        },
    });

    const updateMediaGroup = useMutation({
        mutationKey: [api_routes.media.groups.update._.url],
        mutationFn: async (props: types_update.PostRequest) => {
            const { data } = await api_routes.media.groups.update._.post(props);

            if (!data.success) throw new Error("Failed to update media group");

            return data.success;
        },
    });

    const removeMediaGroup = useMutation({
        mutationKey: [api_routes.media.groups.remove._.url],
        mutationFn: async (props: types_remove.PostRequest) => {
            const { data } = await api_routes.media.groups.remove._.post(props);

            if (!data.success) throw new Error("Failed to remove media group");

            return data.success;
        },
    });

    return {
        getMediaGroups,
        getMediaGroup,
        createMediaGroup,
        updateMediaGroup,
        removeMediaGroup,
    };
}
