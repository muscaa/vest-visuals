"use client";

import { useParams } from "next/navigation";
import { useAlbums } from "@/hooks/albums/useAlbums";
import { AlbumsContentsList } from "@/components/lists/albums/albums-contents";
import {
    Loading,
    NotFound,
} from "@/components/status";
import { A_ALBUMS } from "@shared/i18n";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export default function Page() {
    const params = useParams<{ id: string }>();
    const { useAlbum } = useAlbums();
    const { data } = useAlbum(params.id);

    useBreadcrumbs([
        ["Albums", A_ALBUMS()],
        params.id,
    ]);

    return (
        data && (
            <AlbumsContentsList
                data={data.albumsContents}
                parent={data}
            />
        ) || data === null && (
            <NotFound />
        ) || (
            <Loading />
        )
    );
}
