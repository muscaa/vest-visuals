"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { useMediaCategories } from "@/hooks/useMediaCategories";
import { Loading } from "@/components/status";
import { MediaCategoriesList } from "@/components/lists/media-categories";

export default function Page() {
    const { useAllMediaCategories } = useMediaCategories();
    const { data } = useAllMediaCategories();

    return (
        <MainSidebarProvider
            breadcrumbs={{
                page: "Media Categories",
            }}
            extraClassName="overflow-hidden"
        >
            {
                data && (
                    <MediaCategoriesList
                        data={data}
                    />
                ) || (
                    <Loading />
                )
            }
        </MainSidebarProvider>
    );
}
