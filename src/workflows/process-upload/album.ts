import { createAlbumEntry, findAlbumVideo, removeAlbumEntry, saveAlbumVariants } from "../albums/steps";
import { copyOriginal, makeImageSize, readImageSize } from "../images/steps";
import type { ImageSource } from "../images/steps";
import type { Upload } from "@server/uploads";

/**
 * An uploaded photo becomes a new media at the end of its directory: there right away, processing, then shown once its
 * original (downloaded under its own name) and chosen sizes are saved. If that fails, it's taken out again.
 */
export async function processAlbum(upload: Extract<Upload, { type: "album" }>) {
    const { albumId, parentId, sizes } = upload.data;
    const source: ImageSource = { bucket: "uploads", key: upload.id };

    const entryId = await createAlbumEntry(albumId, parentId, upload.filename);
    const target = { bucket: "albums", folder: entryId } as const;
    try {
        const original = await readImageSize(source);
        await copyOriginal(upload.id, target, upload.contentType, upload.filename);
        const made = await Promise.all(sizes.map((size) => makeImageSize(source, target, size)));
        await saveAlbumVariants(albumId, entryId, [{ variant: "original", contentType: upload.contentType, ...original }, ...made]);
    } catch (error) {
        await removeAlbumEntry(albumId, entryId);
        throw error;
    }
}

/**
 * An uploaded video file becomes the file of a video playing from YouTube, for downloading under its own name; it's
 * copied as it is, its shape is the YouTube video's. Uploading another replaces it.
 */
export async function processAlbumVideo(upload: Extract<Upload, { type: "album_video" }>) {
    const { albumId, entryId } = upload.data;

    const video = await findAlbumVideo(entryId);
    await copyOriginal(upload.id, { bucket: "albums", folder: entryId }, upload.contentType, upload.filename);
    await saveAlbumVariants(albumId, entryId, [
        video,
        { variant: "original", contentType: upload.contentType, width: video.width, height: video.height },
    ], upload.filename);
}
