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
    const { useMediaCategory } = useMediaCategories();
    const { data, refetch } = useMediaCategory(params.id);

    return (
        <MainAdmin extraClassName="overflow-hidden">
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
        </MainAdmin>
    );
}
