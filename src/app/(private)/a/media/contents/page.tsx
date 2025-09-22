"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { useMediaContents } from "@/hooks/useMediaContents";
import { Loading } from "@/components/status";
import { MediaContentsList } from "@/components/lists/media-contents";

export default function Page() {
    const { useAllMediaContents } = useMediaContents();
    const { data, refetch } = useAllMediaContents();

    return (
        <MainSidebarProvider
            breadcrumbs={{
                page: "Media Contents",
            }}
            extraClassName="overflow-hidden"
        >
            {
                data && (
                    <MediaContentsList
                        data={data}
                        refetch={refetch}
                    />
                ) || (
                    <Loading />
                )
            }
        </MainSidebarProvider>
    );
}
