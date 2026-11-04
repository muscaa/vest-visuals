import { z } from "zod";
import { publicUrl } from "./s3";

/** The roles of the admin plugin, see src/lib/server/auth. */
export type Role = "user" | "admin";

/** Whether a user can use the admin site. Works with the session's user on the server and the client. */
export function isAdmin(user: { role?: string | null } | null | undefined) {
    return user?.role === "admin";
}

/** The part of an email before the @, used as the name of new accounts: "ion.popescu@exemplu.ro" → "ion.popescu". */
export function nameFromEmail(email: string) {
    return email.split("@")[0];
}

/** The `redirect` search param: where to go after signing in, a path of this site (never `//other.site`). */
export const redirectParam = z.string().regex(/^\/(?![/\\])/).optional().catch(undefined);

/** The photos users can pick for their profile, by MIME type, and how big they can be. */
export const avatarTypes = ["image/jpeg", "image/png", "image/webp"];
export const avatarMaxSize = 10 * 1024 * 1024;

/**
 * Where a user's profile photo is, if they have one. Ours are stored as their key in the avatars bucket, so moving the
 * storage doesn't break them; a full url (from a social sign in) is kept as it is.
 */
export function avatarUrl(image: string | null | undefined) {
    if (!image) return undefined;
    return /^https?:\/\//.test(image) ? image : publicUrl("avatars", image);
}
