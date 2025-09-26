import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@client/http";
import * as types from "@type/api/cli";

export function useCli() {
    const execute = useMutation({
        mutationFn: async (input: string) => {
            const { data } = await apiClient.post<types.PostResponse, types.PostRequest>("/cli", {
                input,
            });
            if (!data.success) throw new Error(data.error);

            return data.output;
        },
    });

    return {
        execute,
    };
}
