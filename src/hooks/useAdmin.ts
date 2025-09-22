"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { authClient } from "@client/auth";
import { apiClient } from "@client/http";
import * as types from "@type/api/minio";
import { openNewTab } from "@client/snippets";

export function useAdmin() {
    const queryClient = useQueryClient();

    const useUsers = () => useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data, error } = await authClient.admin.listUsers({
                query: {
                    sortBy: "role",
                    sortDirection: "asc",
                },
            });
            if (error) return undefined;

            return data.users;
        },
    });

    const openMinio = useMutation({
        mutationFn: async () => {
            const { data } = await apiClient.post<types.PostResponse, types.PostRequest>("/minio", {});
            if (!data.success) throw new Error(data.error);

            openNewTab(data.url);
            return data.url;
        },
    });

    return {
        useUsers,
        openMinio,
    };
}
