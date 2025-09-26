"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { useMediaGroups } from "@/hooks/useMediaGroups";
import { Loading } from "@/components/status";
import { MediaGroupsList } from "@/components/lists/media-groups";

export default function Page() {
    const { useAllMediaGroups } = useMediaGroups();
    const { data } = useAllMediaGroups();

    return (
        <MainSidebarProvider
            breadcrumbs={{
                page: "Media Groups",
            }}
            extraClassName="overflow-hidden"
        >
            {
                data && (
                    <MediaGroupsList
                        data={data}
                    />
                ) || (
                    <Loading />
                )
            }
        </MainSidebarProvider>
    );
}
