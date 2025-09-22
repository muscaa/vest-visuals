"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { useParams } from "next/navigation";
import { useMediaGroups } from "@/hooks/useMediaGroups";
import { MediaContentsList } from "@/components/lists/media-contents";
import {
    Loading,
    NotFound,
} from "@/components/status";

export default function Page() {
    const params = useParams<{ id: string }>();
    const { useMediaGroup } = useMediaGroups();
    const { data, refetch } = useMediaGroup(params.id);

    return (
        <MainSidebarProvider
            breadcrumbs={{
                path: [
                    {
                        href: "/a/media/groups",
                        text: "Media Groups",
                    }
                ],
                page: params.id,
            }}
            extraClassName="overflow-hidden"
        >
            {
                data && (
                    <MediaContentsList
                        data={data.mediaContents}
                        refetch={refetch}
                        parent={data}
                    />
                ) || data === null && (
                    <NotFound />
                ) || (
                    <Loading />
                )
            }
        </MainSidebarProvider>
    );
}
