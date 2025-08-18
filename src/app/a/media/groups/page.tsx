"use client";

import { MainAdmin } from "@/components/admin/main";
import { useMediaGroups } from "@/hooks/useMediaGroups";
import { Loading } from "@/components/status";
import { MediaGroupsList } from "@/components/lists/media-groups";

export default function Page() {
    const { useAllMediaGroups } = useMediaGroups();
    const { data, refetch } = useAllMediaGroups();

    return (
        <MainAdmin extraClassName="overflow-hidden">
            {
                data && (
                    <MediaGroupsList
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
