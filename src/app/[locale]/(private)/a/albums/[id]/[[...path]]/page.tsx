"use client";

import { useParams } from "next/navigation";
import { AlbumsContentsList } from "@/components/lists/albums/albums-contents";
import {
    Loading,
    NotFound,
} from "@/components/status";
import { A_ALBUMS } from "@shared/i18n";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { useAlbumsContents } from "@/hooks/albums/useAlbumsContents";

export default function Page() {
    const params = useParams<{ id: string; path?: string[]; }>();
    const { useAlbumsContentByPath } = useAlbumsContents();
    const { data } = useAlbumsContentByPath(params.id, params.path);

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
