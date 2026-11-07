import { auth } from "@server/auth";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

/** Every user, newest first. Better Auth's admin plugin checks that the caller is an admin. */
export const listUsers = createServerFn({ method: "GET" }).handler(async () => {
    const { users } = await auth.api.listUsers({
        query: { sortBy: "createdAt", sortDirection: "desc" },
        headers: getRequestHeaders(),
    });
    return users;
});

export type AdminUser = Awaited<ReturnType<typeof listUsers>>[number];

/** The users for the admin's table; refreshed with `invalidateQueries(usersQuery)` after changing one. */
export const usersQuery = queryOptions({
    queryKey: ["admin", "users"],
    queryFn: () => listUsers(),
});
