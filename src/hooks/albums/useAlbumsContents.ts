"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import * as types from "@type/albums/contents";
import * as contents from "@/actions/albums/contents";
import { useState } from "react";
import { API_ALBUMS_CONTENTS } from "@shared/i18n";
import { ResponseBody } from "@type/http";

interface UploadProgress {
    at: number;
    max: number;
}

export function useAlbumsContents() {
    const queryClient = useQueryClient();
    const [mediaUploadProgress, setMediaUploadProgress] = useState<UploadProgress>();

    const useAllAlbumsContents = () => useQuery({
        queryKey: ["albums", "contents"],
        queryFn: async () => {
            const [status, result] = await contents.getAll();
            if (status !== "OK") return [];

            return result || [];
        },
    });

    const useAlbumsContentsByAlbumId = (albumId: string) => useQuery({
        queryKey: ["albums", "contents", "by-id"],
        queryFn: async () => {
            const [status, result] = await contents.getByAlbumId(albumId);
            if (status !== "OK") return [];

            return result || [];
        },
    });

    const useAlbumsContent = (id: string) => useQuery({
        queryKey: ["albums", id],
        queryFn: async () => {
            const [status, result] = await contents.get(id);
            if (status !== "OK") return null;

            return result || null;
        },
    });

    const useAlbumsContentByPath = (albumId: string, path?: string[]) => useQuery({
        queryKey: ["albums", albumId, path],
        queryFn: async () => {
            const [status, result] = await contents.getByPath(albumId, path);
            if (status !== "OK") return null;

            return result || null;
        },
    });

    const createAlbumsContentDirectory = useMutation({
        mutationFn: async (props: { content: Omit<types.CreateFormData.content, "type">; directory: types.CreateFormData.directory; }) => {
            const formData = new FormData();
            formData.append(types.CreateFormData.content, JSON.stringify({
                ...props.content,
                type: "directory",
            } satisfies types.CreateFormData.content));
            formData.append(types.CreateFormData.directory, JSON.stringify(props.directory));

            const response = await fetch(API_ALBUMS_CONTENTS, {
                method: "POST",
                body: formData,
            });
            if (!response.ok) throw new Error("Server error");

            const [status, result]: ResponseBody<types.PartialAlbumsContent> = await response.json();
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["albums"] });

            return result;
        },
    });

    const createAlbumsContentMedia = useMutation({
        mutationFn: async (props: { content: Omit<types.CreateFormData.content, "type">; mediaFile: types.CreateFormData.mediaFile; mediaConfig: types.CreateFormData.mediaConfig; }[]) => {
            const values: types.PartialAlbumsContent[] = [];

            setMediaUploadProgress({
                at: 0,
                max: props.length,
            });

            for (let i = 0; i < props.length; i++) {
                try {
                    const content = props[i].content;
                    const mediaFile = props[i].mediaFile;
                    const mediaConfig = props[i].mediaConfig;

                    const formData = new FormData();
                    formData.append(types.CreateFormData.content, JSON.stringify({
                        ...content,
                        type: "media",
                    } satisfies types.CreateFormData.content));
                    formData.append(types.CreateFormData.mediaFile, mediaFile);
                    formData.append(types.CreateFormData.mediaConfig, JSON.stringify(mediaConfig));

                    const response = await fetch(API_ALBUMS_CONTENTS, {
                        method: "POST",
                        body: formData,
                    });
                    if (!response.ok) throw new Error("Server error");

                    const [status, result]: ResponseBody<types.PartialAlbumsContent> = await response.json();
                    if (status !== "OK") throw new Error(result as string);

                    await queryClient.invalidateQueries({ queryKey: ["albums"] });

                    values.push(result);

                    setMediaUploadProgress({
                        at: i + 1,
                        max: props.length,
                    });
                } catch (error) { }
            }

            setMediaUploadProgress(undefined);

            return values;
        },
    });

    const updateAlbumsContent = useMutation({
        mutationFn: async (props: { id: string; value: types.UpdateProps; }) => {
            const [status, result] = await contents.update(props.id, props.value);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["albums"] });

            return true;
        },
    });

    const removeAlbumsContent = useMutation({
        mutationFn: async (id: string) => {
            const [status, result] = await contents.remove(id);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: ["albums"] });

            return true;
        },
    });

    return {
        useAllAlbumsContents,
        useAlbumsContentsByAlbumId,
        useAlbumsContent,
        useAlbumsContentByPath,
        createAlbumsContentMedia,
        mediaUploadProgress,
        createAlbumsContentDirectory,
        updateAlbumsContent,
        removeAlbumsContent,
    };
}
