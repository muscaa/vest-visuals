"use client";

import {
    useQuery,
    useMutation,
} from "@tanstack/react-query";
import { api_routes } from "@/utils/client/axios";
import * as types_upload from "@/types/api/media/contents/upload";
import * as types_remove from "@/types/api/media/contents/remove";

export function useMediaContents() {
    const useAllMediaContents = () => useQuery({
        queryKey: [api_routes.media.contents._.url],
        queryFn: async () => {
            const { data } = await api_routes.media.contents._.post({});

            if (!data.success) return [];

            return data.values || [];
        },
    });

    const useMediaContent = (id: string) => useQuery({
        queryKey: [api_routes.media.contents.get._.url, id],
        queryFn: async () => {
            const { data } = await api_routes.media.contents.get._.post({
                id,
            });

            if (!data.success) return null;

            return data.value || null;
        },
    });

    const uploadMediaContents = useMutation({
        mutationKey: [api_routes.media.contents.upload._.url],
        mutationFn: async (props: types_upload.PostRequest) => {
            const formData = new FormData();
            Array.from(props.files).forEach((file) => formData.append(types_upload.formData.files, file));
            props.configs.forEach((config) => formData.append(types_upload.formData.configs, JSON.stringify(config)));

            const { data } = await api_routes.media.contents.upload._.postForm(formData);

            if (!data.success) throw new Error(data.message);

            return data.values;
        },
    });

    const removeMediaContents = useMutation({
        mutationKey: [api_routes.media.contents.remove._.url],
        mutationFn: async (props: types_remove.PostRequest) => {
            const { data } = await api_routes.media.contents.remove._.post(props);

            if (!data.success) throw new Error(data.message);

            return data.success;
        },
    });

    return {
        useAllMediaContents,
        useMediaContent,
        uploadMediaContents,
        removeMediaContents,
    };
}
