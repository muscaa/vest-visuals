import { createServerFn } from "@tanstack/react-start";
import { removeAvatar, saveAvatar } from "@server/avatars";
import { avatarMaxSize, avatarTypes } from "@shared/auth";
import { sessionMiddleware } from "./auth";

/** Sets the user's profile photo, from a form with its file as `photo`; refresh the session after. */
export const changeAvatar = createServerFn({ method: "POST" })
    .middleware([sessionMiddleware])
    .validator((data: unknown) => {
        const photo = data instanceof FormData ? data.get("photo") : null;
        if (!(photo instanceof File) || !avatarTypes.includes(photo.type) || photo.size > avatarMaxSize) {
            throw new Error("A JPEG, PNG or WebP photo of up to 10 MB is needed");
        }
        return photo;
    })
    .handler(async ({ data: photo, context }) => {
        await saveAvatar(context.user.id, await photo.arrayBuffer());
    });

export const deleteAvatar = createServerFn({ method: "POST" })
    .middleware([sessionMiddleware])
    .handler(async ({ context }) => {
        await removeAvatar(context.user.id);
    });
