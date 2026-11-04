/**
 * Profile photos: one per user, a small square WebP in the avatars bucket at `{userId}/{id}.webp`. Each new photo gets
 * a new key, so browsers and Cloudflare never show the old one and nothing has to be purged.
 */
import { eq } from "drizzle-orm";
import sharp from "sharp";
import { v7 as uuidv7 } from "uuid";
import { db } from "@server/db";
import { user } from "@server/db/schema";
import { deleteObjects, deletePrefix, listKeys, putObject } from "@server/s3";
import { imageQuality } from "@shared/images";

/** in px, both ways; avatars are shown at 80px at most, so this is sharp on any screen */
const avatarSize = 256;

/** Crops the photo to a square around what's in it (a face, mostly), saves it as the user's and deletes the old one. */
export async function saveAvatar(userId: string, file: ArrayBuffer) {
    let data: Buffer;
    try {
        data = await sharp(Buffer.from(file))
            .rotate()
            .resize(avatarSize, avatarSize, { fit: "cover", position: "attention" })
            .webp({ quality: imageQuality })
            .toBuffer();
    } catch {
        throw new Error("The file isn't an image that can be read");
    }

    const key = `${userId}/${uuidv7()}.webp`;
    await putObject("avatars", key, data, { contentType: "image/webp", cacheControl: "public, max-age=31536000, immutable" });
    await db.update(user).set({ image: key }).where(eq(user.id, userId));

    const old: string[] = [];
    for await (const stored of listKeys("avatars", `${userId}/`)) {
        if (stored !== key) old.push(stored);
    }
    await deleteObjects("avatars", old);
}

/** Back to the initial; also when the account is deleted. */
export async function removeAvatar(userId: string) {
    await db.update(user).set({ image: null }).where(eq(user.id, userId));
    await deletePrefix("avatars", `${userId}/`);
}
