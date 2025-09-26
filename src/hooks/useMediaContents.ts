"use client";

import { useState } from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "@client/http";
import { PartialMediaContent } from "@type/media/contents";
import * as types from "@type/api/media/contents";
import * as types_get from "@type/api/media/contents/get";
import * as types_upload from "@type/api/media/contents/upload";
import * as types_remove from "@type/api/media/contents/remove";

interface UploadProgress {
    at: number;
    max: number;
}

export function useMediaContents() {
    const queryClient = useQueryClient();
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>();

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
            if (props.files.length != props.configs.length) throw new Error("Files & configs length don't match");

            const values: PartialMediaContent[] = [];

            setUploadProgress({
                at: 0,
                max: props.files.length,
            });

            for (let i = 0; i < props.files.length; i++) {
                try {
                    const file = props.files[i];
                    const config = props.configs[i];

                    const formData = new FormData();
                    formData.append(types_upload.formData.files, file);
                    formData.append(types_upload.formData.configs, JSON.stringify(config));

                    const { data } = await apiClient.postForm<types_upload.PostResponse>("/media/contents/upload", formData);
                    if (!data.success) throw new Error(data.error);

                    await queryClient.invalidateQueries({ queryKey: ["media"] });

                    values.push(...data.values);

                    setUploadProgress({
                        at: i + 1,
                        max: props.files.length,
                    });
                } catch (error) { }
            }

            setUploadProgress(undefined);

            return values;
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
        uploadProgress,
        removeMediaContents,
    };
}
