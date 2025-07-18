"use client";

import { MainAdmin } from "@/components/admin/main";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import * as types from "@/types/api/images";
import { ImagesRecord } from "@/types/db/images";
import { api_client } from "@/utils/client/axios";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImagesCreateDialog } from "@/components/dialogs/images-create";
import Image from "next/image";

interface ImagesRecordEntryProps {
    record: ImagesRecord;
    selected: boolean;
    onSelect: (record: ImagesRecord) => void;
}

function ImagesRecordEntry(props: ImagesRecordEntryProps) {
    return (
        <Button
            variant="card"
            size="none"
            onClick={() => props.onSelect(props.record)}
            className={props.selected ? "border-accent-foreground dark:border-accent-foreground" : ""}
        >
            <div className="flex gap-4 size-full whitespace-normal">
                <Image src="/placeholder0.png" alt="placeholder" width={128} height={128} className="w-32 object-contain" />
                <div className="flex flex-col gap-1 grow">
                    <h4>{props.record.group}</h4>
                    <Separator />
                    <div className="flex gap-2 text-muted-foreground">
                        <div className="flex flex-col grow">
                            <p>{props.record.type}</p>
                            <h6>Updated: {new Date(props.record.updated).toLocaleString(undefined, { hour12: false })}</h6>
                            <h6>Created: {new Date(props.record.created).toLocaleString(undefined, { hour12: false })}</h6>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p>{props.record.items?.length || 0}</p>
                            <h5>items</h5>
                        </div>
                    </div>
                </div>
            </div>
        </Button>
    );
}

export default function Page() {
    const [filter, setFilter] = useState<string>();
    const [sort, setSort] = useState<string>();
    const [selectedRecord, setSelectedRecord] = useState<ImagesRecord>();

    const { data, refetch } = useQuery({
        queryKey: ["images", filter, sort],
        queryFn: async () => {
            const { data } = await api_client.post<types.PostResponse, types.PostRequest>("/images", {
                filter,
                sort,
            });

            if (!data.success) return [];

            return data.value || [];
        },
    });

    const handleSelect = (record: ImagesRecord) => {
        setSelectedRecord(selectedRecord?.id == record.id ? undefined : record);
    };

    return (
        <MainAdmin extraClassName="overflow-hidden">
            <div className="flex justify-center items-center size-full p-2">
                <div className="flex flex-col size-full max-w-3xl max-h-144 gap-2">
                    <div className="flex gap-2">
                        <ImagesCreateDialog
                            onCreate={refetch}
                        >
                            <Button
                                className="grow"
                            >
                                New
                            </Button>
                        </ImagesCreateDialog>
                        <Button
                            variant="secondary"
                            disabled={!selectedRecord}
                            className="grow"
                        >
                            Edit
                        </Button>
                        <Button
                            variant="secondary"
                            disabled={!selectedRecord}
                            className="grow"
                        >
                            Delete
                        </Button>
                    </div>
                    <Separator />
                    <div className="flex flex-col max-h-full h-full overflow-y-auto">
                        <div className="flex flex-col grow gap-2">
                            {
                                data && (
                                    data.map((item, index) => (
                                        <ImagesRecordEntry
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
