"use client";

import { AlbumsList } from "@/components/lists/albums/albums";
import { Loading } from "@/components/status";
import { useAlbums } from "@/hooks/albums/useAlbums";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export default function Page() {
    const { useAllAlbums } = useAlbums();
    const { data } = useAllAlbums();

    useBreadcrumbs([
        "Albums",
    ]);

    return (
        data && (
            <AlbumsList
                data={data}
            />
        ) || (
            <Loading />
        )
    );
}
