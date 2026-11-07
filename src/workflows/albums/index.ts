import { makeImageSize } from "../images/steps";
import { buildAlbumArchive, deleteExpiredAlbum, failAlbumArchive, findAlbumOriginal, findExpiredAlbums, saveAlbumVariants } from "./steps";
import type { ImageSize } from "@shared/images";

/**
 * Makes an album photo's sizes again from its stored original, only the ones given: new ones are added, the others
 * deleted. Started by `changeAlbumEntryVariants`.
 */
export async function reprocessAlbumEntry(albumId: string, entryId: string, sizes: ImageSize[]) {
    "use workflow";

    const original = await findAlbumOriginal(entryId);
    const target = { bucket: "albums", folder: entryId } as const;
    const made = await Promise.all(sizes.map((size) => makeImageSize(original.source, target, size)));
    await saveAlbumVariants(albumId, entryId, [original.variant, ...made]);
}

/**
 * Builds an album's zip from what it holds now; started by `syncAlbumArchive`, which marks it as building. Saving it
 * marks it idle again, failing marks it failed.
 */
export async function syncAlbumArchiveRun(albumId: string) {
    "use workflow";

    try {
        await buildAlbumArchive(albumId);
    } catch (error) {
        await failAlbumArchive(albumId);
        throw error;
    }
}

/** Deletes every album past its deletion date, each in its own step, so one failing doesn't stop the others. */
export async function deleteExpiredAlbums() {
    "use workflow";

    const expired = await findExpiredAlbums();
    for (const albumId of expired) await deleteExpiredAlbum(albumId);
    return { deleted: expired.length };
}
