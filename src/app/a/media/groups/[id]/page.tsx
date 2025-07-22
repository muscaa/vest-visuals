"use client";

import { MainAdmin } from "@/components/admin/main";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { api_client } from "@/utils/client/axios";
import * as types_get from "@/types/api/media/groups/get";
import * as types_update from "@/types/api/media/groups/update";
import { Button } from "@/components/ui/button";
import { Img } from "@/components/snippets";
import {
    useMemo,
    useState,
} from "react";
import { MediaUploadDialog } from "@/components/dialogs/media-upload";

type Record = string;

interface EntryProps {
    record: Record;
    selected: boolean;
    onSelect: (record: Record) => void;
}

function Entry(props: EntryProps) {
    const image = useMemo(() => {
        /*if (props.record.expand && props.record.expand.mediaVariants && props.record.expand.mediaVariants.length > 0) {
            const mediaVariant = props.record.expand.mediaVariants[0];

            if (mediaVariant.expand && mediaVariant.expand.media && mediaVariant.expand.media.length > 0) {
                const media = mediaVariant.expand.media[0];

                return media.file;
            }
        }*/

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
                    className="w-32 object-contain"
                />
                <div className="flex flex-col gap-1 grow">
                    <h4>{props.record}</h4>
                    {/*<Separator />
                    <div className="flex gap-2 text-muted-foreground">
                        <div className="flex flex-col grow">
                            <p>{props.record.category}</p>
                            <h6>Updated: {new Date(props.record.updated).toLocaleString(undefined, { hour12: false })}</h6>
                            <h6>Created: {new Date(props.record.created).toLocaleString(undefined, { hour12: false })}</h6>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p>{props.record.mediaVariants?.length || "no"}</p>
                            <h5>items</h5>
                        </div>
                    </div>*/}
                </div>
            </div>
        </Button>
    );
}

export default function Page() {
    const params = useParams<{ id: string }>();
    const [selectedRecord, setSelectedRecord] = useState<Record>();

    const { data, refetch } = useQuery({
        queryKey: ["media/groups/get", params.id],
        queryFn: async () => {
            const { data } = await api_client.post<types_get.PostResponse, types_get.PostRequest>("/media/groups/get", {
                id: params.id,
            });

            return data.value;
        },
    });

    const handleSelect = (record: Record) => {
        setSelectedRecord(selectedRecord == record ? undefined : record);
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
                        <MediaUploadDialog
                            onUpload={async (data) => {
                                if (data.values) {
                                    await api_client.post<types_update.PostResponse, types_update.PostRequest>("/media/groups/update", {
                                        id: params.id,
                                        mediaVariants: {
                                            append: data.values.map((record) => record.id),
                                        },
                                    });
                                }

                                handleUpdate();
                            }}
                        >
                            <Button
                                className="grow"
                            >
                                Upload
                            </Button>
                        </MediaUploadDialog>
                    </div>
                    <Separator />
                    <div className="flex flex-col max-h-full h-full overflow-y-auto">
                        <div className="flex flex-col grow gap-2">
                            {
                                data && (
                                    data.mediaVariants?.map((item, index) => (
                                        <Entry
                                            key={index}
                                            record={item}
                                            selected={selectedRecord == item}
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
