"use client";

import { MainAdmin } from "@/components/admin/main";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import * as types from "@/types/api/media/groups";
import { MediaGroupsRecord } from "@/types/db/mediaGroups";
import { api_client } from "@/utils/client/axios";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { MediaGroupsCreateDialog } from "@/components/dialogs/media-groups-create";
import { MediaGroupsEditDialog } from "@/components/dialogs/media-groups-edit";
import { MediaGroupsDeleteDialog } from "@/components/dialogs/media-groups-delete";
import { Img } from "@/components/snippets";
import { myDate } from "@/utils/snippets";

interface MediaGroupsRecordEntryProps {
    record: MediaGroupsRecord;
    selected: boolean;
    onSelect: (record: MediaGroupsRecord) => void;
}

function MediaGroupsRecordEntry(props: MediaGroupsRecordEntryProps) {
    const image = useMemo(() => {
        if (props.record.expand && props.record.expand.mediaVariants && props.record.expand.mediaVariants.length > 0) {
            const mediaVariant = props.record.expand.mediaVariants[0];

            if (mediaVariant.expand && mediaVariant.expand.media && mediaVariant.expand.media.length > 0) {
                const media = mediaVariant.expand.media[0];
                
                return media.file;
            }
        }

        return "/placeholder0.png";
    }, [props.record]);

    return (
        <Button
            variant="card"
            size="none"
            onClick={() => props.onSelect(props.record)}
            className={props.selected ? "border-accent-foreground dark:border-accent-foreground" : ""}
        >
            <div className="flex flex-wrap gap-4 size-full whitespace-normal">
                <Img
                    src={image}
                    alt="Preview"
                    width={128}
                    height={128}
                    className="size-32 object-contain"
                />
                <div className="flex flex-col gap-1 grow">
                    <h4>{props.record.id}</h4>
                    <Separator />
                    <div className="flex gap-2 text-muted-foreground">
                        <div className="flex flex-col grow">
                            <p>{props.record.category}</p>
                            <h6>Updated: {myDate(props.record.updated)}</h6>
                            <h6>Created: {myDate(props.record.created)}</h6>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p>{props.record.mediaVariants?.length || "no"}</p>
                            <h5>items</h5>
                        </div>
                    </div>
                </div>
            </div>
        </Button>
    );
}

export default function Page() {
    const router = useRouter();
    const [filter, setFilter] = useState<string>();
    const [sort, setSort] = useState<string>();
    const [selectedRecord, setSelectedRecord] = useState<MediaGroupsRecord>();

    const { data, refetch } = useQuery({
        queryKey: ["media/groups", filter, sort],
        queryFn: async () => {
            const { data } = await api_client.post<types.PostResponse, types.PostRequest>("/media/groups", {
                filter,
                sort,
            });

            if (!data.success) return [];

            return data.values || [];
        },
    });

    const handleSelect = (record: MediaGroupsRecord) => {
        setSelectedRecord(selectedRecord?.id == record.id ? undefined : record);
    };

    const handleUpdate = () => {
        setSelectedRecord(undefined);
        
        refetch();
    };

    return (
        <MainAdmin extraClassName="overflow-hidden">
            <div className="flex justify-center items-center size-full p-2">
                <div className="flex flex-col size-full max-w-4xl max-h-144 gap-2">
                    <div className="flex flex-wrap gap-2">
                        <MediaGroupsCreateDialog
                            onCreate={handleUpdate}
                        >
                            <Button
                                className="grow"
                            >
                                New
                            </Button>
                        </MediaGroupsCreateDialog>
                        <Button
                            variant="secondary"
                            disabled={!selectedRecord}
                            onClick={() => router.push(`/a/media/groups/${selectedRecord?.id}`)}
                            className="grow"
                        >
                            Open
                        </Button>
                        <MediaGroupsEditDialog
                            record={selectedRecord}
                            onEdit={handleUpdate}
                        >
                            <Button
                                variant="secondary"
                                disabled={!selectedRecord}
                                className="grow"
                            >
                                Edit
                            </Button>
                        </MediaGroupsEditDialog>
                        <MediaGroupsDeleteDialog
                            record={selectedRecord}
                            onDelete={handleUpdate}
                        >
                            <Button
                                variant="secondary"
                                disabled={!selectedRecord}
                                className="grow"
                            >
                                Delete
                            </Button>
                        </MediaGroupsDeleteDialog>
                    </div>
                    <Separator />
                    <div className="flex flex-col max-h-full h-full overflow-y-auto">
                        <div className="flex flex-col grow gap-2">
                            {
                                data && (
                                    data.map((item, index) => (
                                        <MediaGroupsRecordEntry
                                            key={index}
                                            record={item}
                                            selected={selectedRecord?.id == item.id}
                                            onSelect={handleSelect}
                                        />
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </MainAdmin>
    );
}
