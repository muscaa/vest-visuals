/** The roles of the admin plugin, see src/lib/server/auth. */
export type Role = "user" | "admin";

/** Whether a user can use the admin site. Works with the session's user on the server and the client. */
export function isAdmin(user: { role?: string | null } | null | undefined) {
    return user?.role === "admin";
}
