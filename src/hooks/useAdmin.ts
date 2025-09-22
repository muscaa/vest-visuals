"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { authClient } from "@client/auth";

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

    return {
        useUsers,
    };
}
