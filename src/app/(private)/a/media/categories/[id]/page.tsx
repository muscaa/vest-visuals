"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { useParams } from "next/navigation";
import { useMediaCategories } from "@/hooks/useMediaCategories";
import { MediaGroupsList } from "@/components/lists/media-groups";
import {
    Loading,
    NotFound,
} from "@/components/status";

export default function Page() {
    const params = useParams<{ id: string }>();
    const { useMediaCategory } = useMediaCategories();
    const { data, refetch } = useMediaCategory(params.id);

    return (
        <MainSidebarProvider
            breadcrumbs={{
                path: [
                    {
                        href: "/a/media/categories",
                        text: "Media Categories",
                    }
                ],
                page: params.id,
            }}
            extraClassName="overflow-hidden"
        >
            {
        data && (
            <MediaGroupsList
                data={data.mediaGroups}
                refetch={refetch}
                parent={data}
            />
        ) || data === null && (
            <NotFound />
        ) || (
                <Loading />
            )
    }
        </MainSidebarProvider >
    );
}
