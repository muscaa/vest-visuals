"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "@client/http";
import * as types from "@type/api/media/contents";
import * as types_get from "@type/api/media/contents/get";
import * as types_upload from "@type/api/media/contents/upload";
import * as types_remove from "@type/api/media/contents/remove";

export function useMediaContents() {
    const queryClient = useQueryClient();

    const useAllMediaContents = () => useQuery({
        queryKey: ["media"],
        queryFn: async () => {
            const { data } = await apiClient.post<types.PostResponse, types.PostRequest>("/media/contents", {});
            if (!data.success) return [];

            return data.values || [];
        },
    });

    const useMediaContent = (id: string) => useQuery({
        queryKey: ["media", id],
        queryFn: async () => {
            const { data } = await apiClient.post<types_get.PostResponse, types_get.PostRequest>("/media/contents/get", {
                id,
            });
            if (!data.success) return null;

            return data.value || null;
        },
    });

    const uploadMediaContents = useMutation({
        mutationFn: async (props: types_upload.PostRequest) => {
            const formData = new FormData();
            Array.from(props.files).forEach((file) => formData.append(types_upload.formData.files, file));
            props.configs.forEach((config) => formData.append(types_upload.formData.configs, JSON.stringify(config)));

            const { data } = await apiClient.postForm<types_upload.PostResponse>("/media/contents/upload", formData);
            if (!data.success) throw new Error(data.error);

            await queryClient.invalidateQueries({ queryKey: ["media"] });

            return data.values;
        },
    });

    const removeMediaContents = useMutation({
        mutationFn: async (props: types_remove.PostRequest) => {
            const { data } = await apiClient.post<types_remove.PostResponse, types_remove.PostRequest>("/media/contents/remove", props);
            if (!data.success) throw new Error(data.error);

            await queryClient.invalidateQueries({ queryKey: ["media"] });

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
