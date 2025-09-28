"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "@client/http";
import {
    RegistryKey,
    RegistryOut,
} from "@type/registries";
import * as types_get from "@type/api/registries/get";
import * as types_update from "@type/api/registries/update";

export function useRegistries() {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: async (props: types_update.PostRequest) => {
            const { data } = await apiClient.post<types_update.PostResponse, types_update.PostRequest>("/registries/update", props);
            if (!data.success) throw new Error(data.error);

            await queryClient.invalidateQueries({ queryKey: [`reg-${props.key}`] });

            return true;
        },
    });

    const useRegistry = <K extends RegistryKey>(key: K | undefined) => useQuery({
        queryKey: [`reg-${key}`],
        queryFn: async () => {
            if (!key) return null;

            const { data } = await apiClient.post<types_get.PostResponse, types_get.PostRequest>("/registries/get", {
                key,
            });
            if (!data.success) return null;

            return data.value as RegistryOut<K>;
        },
    });

    return {
        update,
        useRegistry,
    };
}
