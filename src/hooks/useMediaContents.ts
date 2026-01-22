"use client";

import { useState } from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import * as types from "@type/portfolio/media";
import * as media from "@/actions/portfolio/media";

interface UploadProgress {
    at: number;
    max: number;
}

export function useMediaContents() {
    const queryClient = useQueryClient();
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>();

    const useAllMediaContents = () => useQuery({
        queryKey: ["media", "contents"],
        queryFn: async () => {
            const [status, result] = await media.getAll();
            if (status !== "OK") return [];

            return result || [];
        },
    });

    const useMediaContent = (id: string) => useQuery({
        queryKey: ["media", id],
        queryFn: async () => {
            const [status, result] = await media.get(id);
            if (status !== "OK") return null;

            return result || null;
        },
    });

    const uploadMediaContents = useMutation({
        mutationFn: async (props: { files: types.UploadFormData.file[]; configs: types.UploadFormData.config[]; }) => {
            if (props.files.length != props.configs.length) throw new Error("Files & configs length don't match");

            const values: types.PartialPortfolioMedia[] = [];

            setUploadProgress({
                at: 0,
                max: props.files.length,
            });

            for (let i = 0; i < props.files.length; i++) {
                try {
                    const file = props.files[i];
                    const config = props.configs[i];

                    const formData = new FormData();
                    formData.append(types.UploadFormData.file, file);
                    formData.append(types.UploadFormData.config, JSON.stringify(config));

                    const [status, result] = await media.upload(formData);
                    if (status !== "OK") throw new Error(result as string);

                    await queryClient.invalidateQueries({ queryKey: ["media"] });

                    values.push(result);

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
        mutationFn: async (ids: string[]) => {
            const [status, result] = await media.remove(ids);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["media"] });

            return true;
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
