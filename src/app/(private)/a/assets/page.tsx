"use client";

import { useAssetsMedia } from "@/hooks/assets/useAssetsMedia";
import { Loading } from "@/components/status";
import { AssetsMediaList } from "@/components/lists/assets/assets-media";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export default function Page() {
    const { useAllAssetsMedia } = useAssetsMedia();
    const { data } = useAllAssetsMedia();

    useBreadcrumbs([
        "Assets Media",
    ]);

    return (
        data && (
            <AssetsMediaList
                data={data}
            />
        ) || (
            <Loading />
        )
    );
}
