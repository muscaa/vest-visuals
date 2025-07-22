"use client";

import { MainAdmin } from "@/components/admin/main";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { api_client } from "@/utils/client/axios";
import * as types_get from "@/types/api/media/groups/get";
import * as types_update from "@/types/api/media/groups/update";
import { MediaVariantsRecord } from "@/types/db/mediaVariants";
import {
    Button,
    buttonVariants,
} from "@/components/ui/button";
import { Img } from "@/components/snippets";
import {
    useMemo,
    useState,
} from "react";
import { MediaUploadDialog } from "@/components/dialogs/media-upload";
import { MediaGroupsVariantDeleteDialog } from "@/components/dialogs/media-groups-variant-delete";
import { TextLink } from "@/components/ui/text-link";
import { cn } from "@/utils/shadcn/lib/utils";
import {
    ChevronUp,
    ChevronDown,
} from "lucide-react";
import { myDate } from "@/utils/snippets";

interface EntryProps {
    record: MediaVariantsRecord;
    selected: boolean;
    onSelect: (record: MediaVariantsRecord) => void;
    onMoveUp?: (record: MediaVariantsRecord) => void;
    onMoveDown?: (record: MediaVariantsRecord) => void;
}

function Entry(props: EntryProps) {
    const image = useMemo(() => {
        if (props.record.expand && props.record.expand.media && props.record.expand.media.length > 0) {
            const media = props.record.expand.media[0];

            return media.file;
        }

        return "/placeholder0.png";
    }, [props.record]);

    return (
        <div
            onClick={() => props.onSelect(props.record)}
            className={cn(buttonVariants({
                variant: "card",
                size: "none",
                className: `${props.selected ? "border-accent-foreground dark:border-accent-foreground" : ""}`
            }))}
        >
            <div className="flex gap-4 size-full">
                <div className="flex flex-wrap gap-4 size-full">
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
                        <div className="flex flex-col gap-2 text-muted-foreground">
                            <div className="flex flex-wrap gap-2">
                                {
                                    props.record.expand?.media?.map((media, index) => (
                                        <TextLink
                                            key={index}
                                            href={media.file}
                                            target="_blank"
                                            variant="ghost"
                                        >
                                            {media.variant || media.id}
                                        </TextLink>
                                    ))
                                }
                            </div>
                            <div className="flex flex-col">
                                <h6>Updated: {myDate(props.record.updated)}</h6>
                                <h6>Created: {myDate(props.record.created)}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col grow justify-center gap-2">
                    <Button
                        variant="default"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.onMoveUp?.(props.record);
                        }}
                    >
                        <ChevronUp />
                    </Button>
                    <Button
                        variant="default"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.onMoveDown?.(props.record);
                        }}
                    >
                        <ChevronDown />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    const params = useParams<{ id: string }>();
    const [selectedRecord, setSelectedRecord] = useState<MediaVariantsRecord>();

    const { data, refetch } = useQuery({
        queryKey: ["media/groups/get", params.id],
        queryFn: async () => {
            const { data } = await api_client.post<types_get.PostResponse, types_get.PostRequest>("/media/groups/get", {
                id: params.id,
            });

            return data.value;
        },
    });

    const handleSelect = (record: MediaVariantsRecord) => {
        setSelectedRecord(selectedRecord?.id == record.id ? undefined : record);
    };

    const handleUpdate = () => {
        setSelectedRecord(undefined);

        refetch();
    };

    const handleUpload = async () => {

    };

    const handleMoveUp = async (record: MediaVariantsRecord) => {
        if (!data) return;

        const updated = [...data.mediaVariants!];
        const index = updated.findIndex((id) => id == record.id);

        if (index != undefined && index > 0) {
            const temp = updated[index - 1];
            updated[index - 1] = updated[index];
            updated[index] = temp;

            await api_client.post<types_update.PostResponse, types_update.PostRequest>("/media/groups/update", {
                id: params.id,
                mediaVariants: {
                    replace: updated,
                },
            });

            handleUpdate();
        }
    };

    const handleMoveDown = async (record: MediaVariantsRecord) => {
        if (!data) return;

        const updated = [...data.mediaVariants!];
        const index = updated.findIndex((id) => id == record.id);

        if (index != undefined && index < updated.length - 1) {
            const temp = updated[index + 1];
            updated[index + 1] = updated[index];
            updated[index] = temp;

            await api_client.post<types_update.PostResponse, types_update.PostRequest>("/media/groups/update", {
                id: params.id,
                mediaVariants: {
                    replace: updated,
                },
            });

            handleUpdate();
        }
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

                        {/* import dialog? */}
                        
                        <MediaGroupsVariantDeleteDialog
                            from={data}
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
                        </MediaGroupsVariantDeleteDialog>
                    </div>
                    <Separator />
                    <div className="flex flex-col max-h-full h-full overflow-y-auto">
                        <div className="flex flex-col grow gap-2">
                            {
                                data && (
                                    data.expand?.mediaVariants?.map((item, index) => (
                                        <Entry
                                            key={index}
                                            record={item}
                                            selected={selectedRecord?.id == item.id}
                                            onSelect={handleSelect}
                                            onMoveUp={handleMoveUp}
                                            onMoveDown={handleMoveDown}
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
