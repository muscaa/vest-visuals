"use client";

// import { useMediaCategories } from "@/hooks/useMediaCategories";
import { Loading } from "@/components/status";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
// import { MediaCategoriesList } from "@/components/lists/media-categories";

export default function Page() {
    // const { useAllMediaCategories } = useMediaCategories();
    // const { data } = useAllMediaCategories();
    useBreadcrumbs([
        "Albums",
    ]);

    return (
        // data && (
        //     <MediaCategoriesList
        //         data={data}
        //     />
        // ) || (
        <Loading />
        // )
    );
}
