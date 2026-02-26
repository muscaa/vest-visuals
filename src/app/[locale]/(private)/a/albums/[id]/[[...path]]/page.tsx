"use client";

import { useParams } from "next/navigation";
import { AlbumsContentsList } from "@/components/lists/albums/albums-contents";
import {
    Loading,
    NotFound,
} from "@/components/status";
import {
    A_ALBUMS,
    A_ALBUMS_$ID_$PATH,
} from "@shared/i18n";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { useAlbumsContents } from "@/hooks/albums/useAlbumsContents";
import { useMemo } from "react";
import { BreadcrumbsPage } from "@/components/breadcrumbs";

export default function Page() {
    const params = useParams<{ id: string; path?: string[]; }>();
    const path = useMemo(() => params.path ? params.path.map((value) => decodeURIComponent(value)) : undefined, [params.path]);

    const { useAlbumsContentByPath } = useAlbumsContents();
    const { data } = useAlbumsContentByPath(params.id, path);
    const fullPath = useMemo(() => [params.id, ...(path ?? [])], [params.id, path]);

    useBreadcrumbs([
        ["Albums", A_ALBUMS()],
        ...fullPath.slice(0, -1).map((path, index) => [path, A_ALBUMS_$ID_$PATH(params.id, fullPath.slice(1, index + 1))] satisfies BreadcrumbsPage),
        fullPath[fullPath.length - 1],
    ]);

    return (
        data && (
            <AlbumsContentsList
                data={data}
                albumId={params.id}
                path={path}
            />
        ) || data === null && (
            <NotFound />
        ) || (
            <Loading />
        )
    );
}
