"use client";

import { useParams } from "next/navigation";
import { AlbumsContentsList } from "@/components/lists/albums/albums-contents";
import {
    Loading,
    NotFound,
} from "@/components/status";
import { useAlbumsContents } from "@/hooks/albums/useAlbumsContents";
import { useMemo } from "react";
import { DndContextProvider } from "@/contexts/dnd";

export default function Page() {
    const params = useParams<{ id: string; path?: string[]; }>();
    const path = useMemo(() => params.path ? params.path.map((value) => decodeURIComponent(value)) : undefined, [params.path]);

    const { useAlbumsContentByPath } = useAlbumsContents();
    const { data } = useAlbumsContentByPath(params.id, path);

    return (
        data && (
            <DndContextProvider>
                <AlbumsContentsList
                    data={data}
                    albumId={params.id}
                    path={path}
                />
            </DndContextProvider>
        ) || data === null && (
            <NotFound />
        ) || (
            <Loading />
        )
    );
}
