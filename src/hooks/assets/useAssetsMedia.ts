"use client";

import { useState } from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import * as types from "@type/assets/media";
import * as media from "@/actions/assets/media";

interface UploadProgress {
    at: number;
    max: number;
}

export function useAssetsMedia() {
    const queryClient = useQueryClient();
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>();

    const useAllAssetsMedia = () => useQuery({
        queryKey: ["assets", "media"],
        queryFn: async () => {
            const [status, result] = await media.getAll();
            if (status !== "OK") return [];

            return result || [];
        },
    });

    const useAssetsMedia = (id: string) => useQuery({
        queryKey: ["assets", id],
        queryFn: async () => {
            const [status, result] = await media.get(id);
            if (status !== "OK") return null;

            return result || null;
        },
    });

    const uploadAssetsMedia = useMutation({
        mutationFn: async (props: { files: types.UploadFormData.file[]; configs: types.UploadFormData.config[]; }) => {
            if (props.files.length != props.configs.length) throw new Error("Files & configs length don't match");

            const values: types.PartialAssetsMedia[] = [];

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

                    await queryClient.invalidateQueries({ queryKey: ["assets"] });

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

    const removeAssetsMedia = useMutation({
        mutationFn: async (ids: string[]) => {
            const [status, result] = await media.remove(ids);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["assets"] });

            return true;
        },
    });

    return {
        useAllAssetsMedia,
        useAssetsMedia,
        uploadAssetsMedia,
        uploadProgress,
        removeAssetsMedia,
    };
}
