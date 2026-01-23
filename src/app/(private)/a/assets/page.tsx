"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { useAssetsMedia } from "@/hooks/assets/useAssetsMedia";
import { Loading } from "@/components/status";
import { AssetsMediaList } from "@/components/lists/assets/assets-media";

export default function Page() {
    const { useAllAssetsMedia } = useAssetsMedia();
    const { data } = useAllAssetsMedia();

    return (
        <MainSidebarProvider
            breadcrumbs={{
                page: "Assets Media",
            }}
            extraClassName="overflow-hidden"
        >
            {
                data && (
                    <AssetsMediaList
                        data={data}
                    />
                ) || (
                    <Loading />
                )
            }
        </MainSidebarProvider>
    );
}
