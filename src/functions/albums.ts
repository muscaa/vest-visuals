import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { demoAlbums } from "@server/demo/albums";
import { demoPage } from "@server/demo/gallery";
import type { PublicAlbum } from "@shared/albums";
import type { GalleryPage } from "@shared/gallery";

const pageSize = 30;

/**
 * An album its link can open. A locked one can't be opened anymore, as if deleted, though it's kept until `deleteAt`
 * in case the client still pays. Anyone with the link can see an album, so ids must be hard to guess.
 */
function findOpenAlbum(id: string) {
    // TODO: read from the database
    const album = demoAlbums.find((value) => value.id === id);
    if (!album || new Date() >= new Date(album.lockAt)) {
        throw notFound();
    }
    return album;
}

export const getAlbum = createServerFn({ method: "GET" })
    .validator(z.object({ id: z.string() }))
    .handler(({ data }): PublicAlbum => {
        const { id, title, description, date, coverId, media } = findOpenAlbum(data.id);
        return { id, title, description, date, cover: media.find((item) => item.id === coverId) ?? media[0] };
    });

/** A page of an album's photos and videos. */
export const getAlbumPage = createServerFn({ method: "GET" })
    .validator(z.object({ id: z.string(), cursor: z.number().int().min(0) }))
    .handler(({ data }): GalleryPage => demoPage(findOpenAlbum(data.id).media, data.cursor, pageSize));

/** The link to a zip of the whole album, or null when it isn't ready. */
export const getAlbumDownload = createServerFn({ method: "POST" })
    .validator(z.object({ id: z.string() }))
    .handler(({ data }): { url: string | null } => {
        findOpenAlbum(data.id);
        // TODO: a signed link to the album's zip
        return { url: null };
    });

export const albumQuery = (id: string) => queryOptions({
    queryKey: ["albums", id],
    queryFn: () => getAlbum({ data: { id } }),
});

export const albumMediaQuery = (id: string) => infiniteQueryOptions({
    queryKey: ["albums", id, "media"],
    queryFn: ({ pageParam }) => getAlbumPage({ data: { id, cursor: pageParam } }),
    initialPageParam: 0,
    getNextPageParam: (page) => page.nextCursor,
});
