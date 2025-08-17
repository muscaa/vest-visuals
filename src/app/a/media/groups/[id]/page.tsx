"use client";

import { MainAdmin } from "@/components/admin/main";
import { useParams } from "next/navigation";
import { useMediaGroups } from "@/hooks/useMediaGroups";
import { MediaContentsList } from "../../contents/page";
import {
    Loading,
    NotFound,
} from "@/components/status";

export default function Page() {
    const params = useParams<{ id: string }>();
    const { getMediaGroup } = useMediaGroups();
    const { data, refetch } = getMediaGroup(params.id);

    return (
        <MainAdmin extraClassName="overflow-hidden">
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
        </MainAdmin>
    );
}
