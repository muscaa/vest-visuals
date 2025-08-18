"use client";

import { MainAdmin } from "@/components/admin/main";
import { useMediaCategories } from "@/hooks/useMediaCategories";
import { Loading } from "@/components/status";
import { MediaCategoriesList } from "@/components/lists/media-categories";

export default function Page() {
    const { useAllMediaCategories } = useMediaCategories();
    const { data, refetch } = useAllMediaCategories();

    return (
        <MainAdmin extraClassName="overflow-hidden">
            {
                data && (
                    <MediaCategoriesList
                        data={data}
                        refetch={refetch}
                    />
                ) || (
                    <Loading />
                )
            }
        </MainAdmin>
    );
}
