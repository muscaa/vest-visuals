"use server";

import { ActionResponse } from "@type/http";
import * as types from "@type/albums";
import * as contents from "@server/albums/contents";

export async function getPaginated(offset: number, limit: number, albumId: string, path?: string[]): ActionResponse<types.AlbumsContent[]> {
    const result = await contents.getPaginatedByPathAndTags(offset, limit, albumId, path, ["small", "large"]);
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

        const first = mediaVariants[0];
        const last = mediaVariants[mediaVariants.length - 1];

        return [
            {
                preview: {
                    src: first.fileUrl,
                    width: first.info?.width,
                    height: first.info?.height,
                },
                full: {
                    src: last.fileUrl,
                    width: last.info?.width,
                    height: last.info?.height,
                },
            } satisfies types.AlbumsContent,
        ];
    })];
}
