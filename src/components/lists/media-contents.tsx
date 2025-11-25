"use client";

import {
    useMemo,
    useState,
    useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    ButtonLink,
    Img,
} from "@/components/snippets";
import { dateToString } from "@shared/snippets";
import { SortableList } from "./sortable";
import { MediaContent } from "@type/media/contents";
import { MediaGroup } from "@type/media/groups";
import { MediaContentsDeleteDialog } from "@/components/dialogs/media-contents-delete";
import { MediaContentsUploadDialog } from "@/components/dialogs/media-contents-upload";
import { GripVertical } from "lucide-react";
import { useMediaGroups } from "@/hooks/useMediaGroups";
import {
    DndSortable,
    arrayMove,
} from "@client/dnd";

interface ListEntryProps {
    value: MediaContent;
    sortable: DndSortable;
    disabled?: boolean;
}

function ListEntry(props: ListEntryProps) {
    const image = useMemo(() => props.value.mediaVariants.length > 0 ? props.value.mediaVariants[0].fileUrl : "/placeholder0.png", [props.value]);

    return (
        <div className="flex flex-wrap gap-4 size-full whitespace-normal">
            <Img
                src={image}
                alt="Preview"
                className="size-32 object-contain"
            />
            <div className="flex flex-col gap-1 grow text-foreground">
                <h4>{props.value.id}</h4>
                <Separator />
                <div className="flex gap-2 text-muted-foreground">
                    <div className="flex flex-col gap-2 grow">
                        <div className="flex gap-2 items-center">
                            {
                                props.value.mediaVariants.map((variant, index) => (
                                    <ButtonLink
                                        key={index}
                                        href={variant.fileUrl}
                                        target="_blank"
                                        size="none"
                                        variant="link"
                                    >
                                        {variant.tag}
                                    </ButtonLink>
                                ))
                            }
                        </div>
                        <div className="flex flex-col">
                            <h6>Updated: {dateToString(props.value.updatedAt)}</h6>
                            <h6>Created: {dateToString(props.value.createdAt)}</h6>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p>{props.value.mediaVariants?.length || "no"}</p>
                        <h5>items</h5>
                    </div>
                </div>
            </div>
            {
                !props.disabled && (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Button
                            size="none"
                            variant="link"
                            className="w-10"
                            {...props.sortable.listeners}
                        >
                            <GripVertical strokeWidth={1.5} className="size-10" />
                        </Button>
                    </div>
                )
            }
        </div>
    );
}

interface MediaContentsListProps {
    data: MediaContent[];
    onUpdate?: () => void;
    parent?: MediaGroup;
}

export function MediaContentsList(props: MediaContentsListProps) {
    const [data, setData] = useState<MediaContent[]>(props.data);
    useEffect(() => setData(props.data), [props.data]);

    const [selected, setSelected] = useState<MediaContent>();
    const { updateMediaGroup } = useMediaGroups();

    const handleSelect = (value: MediaContent) => {
        setSelected(selected?.id == value.id ? undefined : value);
    };

    const handleUpdate = () => {
        setSelected(undefined);

        props.onUpdate?.();
    };

    const handleMove = async (from: number, to: number) => {
        if (!props.parent) return;

        setData((prev) => arrayMove(prev, from, to));
        const order = arrayMove(props.data.map((content) => content.id), from, to);

        await updateMediaGroup.mutateAsync({
            id: props.parent.id,
            value: {
                mediaContents: {
                    set: order,
                },
            },
        });

        handleUpdate();
    };

    return (
        <SortableList
            data={data}
            entry={(value, index, sortable) => (
                <ListEntry
                    value={value}
                    sortable={sortable}
                    disabled={!props.parent}
                />
            )}
            entryToId={(value, index) => value.id}
            move={handleMove}
            isSelected={(value) => selected?.id == value.id}
            onSelect={handleSelect}
            disabled={!props.parent}
        >
            <MediaContentsUploadDialog
                onCreate={handleUpdate}
                parent={props.parent}
            >
                <Button
                    className="grow"
                >
                    Upload
                </Button>
            </MediaContentsUploadDialog>
            <MediaContentsDeleteDialog
                value={selected}
                onDelete={handleUpdate}
            >
                <Button
                    variant="secondary"
                    disabled={!selected}
                    className="grow"
                >
                    Delete
                </Button>
            </MediaContentsDeleteDialog>
        </SortableList>
    );
}
