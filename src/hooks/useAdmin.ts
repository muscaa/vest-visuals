"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { authClient } from "@client/auth";
import { openNewTab } from "@client/snippets";
import { getLoginUrl } from "@/actions/minio";

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
            const [status, result] = await getLoginUrl();
            if (status !== "OK") throw new Error(result as string);

            openNewTab(result);
            return result;
        },
    });

    return {
        useUsers,
        openMinio,
    };
}
