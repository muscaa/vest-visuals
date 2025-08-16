"use client";

import { MainAdmin } from "@/components/admin/main";
import { useParams } from "next/navigation";
import { useMediaCategories } from "@/hooks/useMediaCategories";
import { MediaGroupsList } from "../../groups/page";
import {
    Loading,
    NotFound,
} from "@/components/status";

export default function Page() {
    const params = useParams<{ id: string }>();
    const { getMediaCategory } = useMediaCategories();
    const { data, refetch } = getMediaCategory(params.id);

    return (
        <MainAdmin extraClassName="overflow-hidden">
            {
                data && (
                    // <MediaGroupsList
                    //     data={data.mediaGroups}
                    //     refetch={refetch}
                    //     parent={data}
                    // />
                    <div></div>
                ) || data === null && (
                    <NotFound />
                ) || (
                    <Loading />
                )
            }
        </MainAdmin>
    );
}
