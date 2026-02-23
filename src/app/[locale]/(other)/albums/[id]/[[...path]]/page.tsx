"use client";

import { useParams } from "next/navigation";
import { AlbumsContentsList } from "@/components/lists/albums/albums-contents";
import {
    Loading,
    NotFound,
} from "@/components/status";
import { useAlbumsContents } from "@/hooks/albums/useAlbumsContents";
import { useMemo } from "react";
import { MediaWaterfall } from "@/components/media/media-waterfall";
import { getPaginated } from "@/actions/albums";

export default function Page() {
    const params = useParams<{ id: string; path?: string[]; }>();
    const path = useMemo(() => params.path ? params.path.map((value) => decodeURIComponent(value)) : undefined, [params.path]);

    // const { useAlbumsContentByPath } = useAlbumsContents();
    // const { data } = useAlbumsContentByPath(params.id, path);

    const handleNextData = async (offset: number, limit: number) => {
        const [status, result] = await getPaginated(offset, limit, params.id, path);
        if (status !== "OK") return [];

        return result;
    };

    return (
        // data && (
            <MediaWaterfall
                nextData={handleNextData}
            />
            // <AlbumsContentsList
            //     data={data}
            //     albumId={params.id}
            //     path={path}
            // />
        // ) || data === null && (
        //     <NotFound />
        // ) || (
        //     <Loading />
        // )
    );
}
