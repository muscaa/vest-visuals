"use server";

import { ActionResponse } from "@type/http";
import * as contents from "@server/albums/contents";
import { Media } from "@type/media";

export async function getPaginated(offset: number, limit: number, albumId: string, path?: string[]): ActionResponse<Media[]> {
    const result = await contents.getPaginatedByPathAndTags(offset, limit, albumId, path, ["small", "large", "original"]);
    if (!result) {
        return ["NOT_FOUND", "Content not found"];
    }

    return ["OK", result.flatMap((content) => {
        if (content.type !== "media") { // TODO handle directories
            return [];
        }

        const mediaVariants = content.albumsMedia.albumsMediaVariants;
        if (!mediaVariants || mediaVariants.length == 0) {
            return [];
        }

        const preview = mediaVariants[0];
        const full = mediaVariants[mediaVariants.length - 2];
        const download = mediaVariants[mediaVariants.length - 1];

        return [
            {
                alt: content.path.split("/").at(-1),
                preview: {
                    src: preview.fileUrl,
                    width: preview.info?.width,
                    height: preview.info?.height,
                },
                full: {
                    src: full.fileUrl,
                    width: full.info?.width,
                    height: full.info?.height,
                },
                download: {
                    src: download.fileUrl,
                    width: download.info?.width,
                    height: download.info?.height,
                },
            } satisfies Media,
        ];
    })];
}
