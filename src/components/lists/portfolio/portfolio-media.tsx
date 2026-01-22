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
import { SortableList } from "../sortable";
import { PortfolioMedia } from "@type/portfolio/media";
import { PortfolioGroup } from "@type/portfolio/groups";
import { GripVertical } from "lucide-react";
import {
    DndSortable,
    arrayMove,
} from "@client/dnd";
import { usePortfolioGroups } from "@/hooks/portfolio/usePortfolioGroups";
import { PortfolioMediaUploadDialog } from "@/components/dialogs/portfolio/portfolio-media-upload";
import { PortfolioMediaDeleteDialog } from "@/components/dialogs/portfolio/portfolio-media-delete";

interface ListEntryProps {
    value: PortfolioMedia;
    sortable: DndSortable;
    disabled?: boolean;
}

function ListEntry(props: ListEntryProps) {
    const image = useMemo(() => props.value.portfolioMediaVariants.length > 0 ? props.value.portfolioMediaVariants[0].fileUrl : "/placeholder0.png", [props.value]);

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
                                props.value.portfolioMediaVariants.map((variant, index) => (
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
                        <p>{props.value.portfolioMediaVariants?.length || "no"}</p>
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
    data: PortfolioMedia[];
    onUpdate?: () => void;
    parent?: PortfolioGroup;
}

export function MediaContentsList(props: MediaContentsListProps) {
    const [data, setData] = useState<PortfolioMedia[]>(props.data);
    useEffect(() => setData(props.data), [props.data]);

    const [selected, setSelected] = useState<PortfolioMedia>();
    const { updatePortfolioGroup } = usePortfolioGroups();

    const handleSelect = (value: PortfolioMedia) => {
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

        await updatePortfolioGroup.mutateAsync({
            id: props.parent.id,
            value: {
                portfolioMedia: {
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
            <PortfolioMediaUploadDialog
                onCreate={handleUpdate}
                parent={props.parent}
            >
                <Button
                    className="grow"
                >
                    Upload
                </Button>
            </PortfolioMediaUploadDialog>
            <PortfolioMediaDeleteDialog
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
            </PortfolioMediaDeleteDialog>
        </SortableList>
    );
}
