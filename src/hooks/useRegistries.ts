"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "@client/http";
import {
    RegistryKey,
    RegistryIn,
    RegistryOut,
} from "@type/registries";
import * as types_in from "@type/api/registries/in";
import * as types_out from "@type/api/registries/out";
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

            const { data } = await apiClient.post<types_out.PostResponse, types_out.PostRequest>("/registries/out", {
                key,
            });
            if (!data.success) return null;

            return data.value as RegistryOut<K>;
        },
    });

    const useRegistryIn = <K extends RegistryKey>(key: K | undefined) => useQuery({
        queryKey: [`reg-${key}`],
        queryFn: async () => {
            if (!key) return null;

            const { data } = await apiClient.post<types_in.PostResponse, types_in.PostRequest>("/registries/in", {
                key,
            });
            if (!data.success) return null;

            return data.value as RegistryIn<K>;
        },
    });

    return {
        update,
        useRegistry,
        useRegistryIn,
    };
}
