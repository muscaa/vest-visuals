"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import {
    RegistryKey,
    RegistryIn,
    RegistryOut,
} from "@type/registries";
import * as registries from "@/actions/registries";

export function useRegistries() {
    const queryClient = useQueryClient();

    const useRegistry = <K extends RegistryKey>(key: K | undefined) => useQuery({
        queryKey: [`reg-${key}`, "out"],
        queryFn: async () => {
            if (!key) return null;

            const [status, result] = await registries.getOutput(key);
            if (status !== "OK") return null;

            return result as RegistryOut<K>;
        },
    });

    const useRegistryIn = <K extends RegistryKey>(key: K | undefined) => useQuery({
        queryKey: [`reg-${key}`, "in"],
        queryFn: async () => {
            if (!key) return null;

            const [status, result] = await registries.getInput(key);
            if (status !== "OK") return null;

            return result as RegistryIn<K>;
        },
    });

    const update = useMutation({
        mutationFn: async (props: { key: RegistryKey; value: RegistryIn<RegistryKey>; }) => {
            const [status, result] = await registries.update(props.key, props.value);
            if (status !== "OK") throw new Error(result as string);

            await queryClient.invalidateQueries({ queryKey: [`reg-${props.key}`] });

            return true;
        },
    });

    return {
        useRegistry,
        useRegistryIn,
        update,
    };
}
