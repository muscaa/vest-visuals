"use client";

import {
    useMemo,
    useState,
    useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Img } from "@/components/snippets";
import { dateToString } from "@shared/snippets";
import { SortableList } from "../sortable";
import { PartialPortfolioGroup } from "@type/portfolio/groups";
import { PortfolioCategory } from "@type/portfolio/categories";
import { GripVertical } from "lucide-react";
import {
    DndSortable,
    arrayMove,
} from "@client/dnd";
import { usePortfolioCategories } from "@/hooks/portfolio/usePortfolioCategories";
import { usePortfolioMedia } from "@/hooks/portfolio/usePortfolioMedia";
import { PortfolioGroupsCreateDialog } from "@/components/dialogs/portfolio/portfolio-groups-create";
import { PortfolioGroupsEditDialog } from "@/components/dialogs/portfolio/portfolio-groups-edit";
import { PortfolioGroupsDeleteDialog } from "@/components/dialogs/portfolio/portfolio-groups-delete";
import {
    A_PORTFOLIO_GROUPS_$ID,
    PLACEHOLDER,
} from "@shared/paths";

interface ListEntryProps {
    value: PartialPortfolioGroup;
    sortable: DndSortable;
    disabled?: boolean;
}

function ListEntry(props: ListEntryProps) {
    const { usePortfolioMedia: useMedia } = usePortfolioMedia();
    const { data } = useMedia(props.value.portfolioMediaIds.length > 0 ? props.value.portfolioMediaIds[0] : "null");
    const image = useMemo(() => data && data.portfolioMediaVariants.length > 0 ? data.portfolioMediaVariants[0].fileUrl : PLACEHOLDER, [data]);

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
                        <p>{props.value.description}</p>
                        <div className="flex flex-col">
                            <h6>Updated: {dateToString(props.value.updatedAt)}</h6>
                            <h6>Created: {dateToString(props.value.createdAt)}</h6>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p>{props.value.portfolioMediaIds.length || "no"}</p>
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

interface ListProps {
    data: PartialPortfolioGroup[];
    onUpdate?: () => void;
    parent?: PortfolioCategory;
}

export function PortfolioGroupsList(props: ListProps) {
    const router = useRouter();

    const [data, setData] = useState<PartialPortfolioGroup[]>(props.data);
    useEffect(() => setData(props.data), [props.data]);

    const [selected, setSelected] = useState<PartialPortfolioGroup>();
    const { updatePortfolioCategory } = usePortfolioCategories();

    const handleSelect = (value: PartialPortfolioGroup) => {
        setSelected(selected?.id == value.id ? undefined : value);
    };

    const handleUpdate = () => {
        setSelected(undefined);

        props.onUpdate?.();
    };

    const handleMove = async (from: number, to: number) => {
        if (!props.parent) return;

        setData((prev) => arrayMove(prev, from, to));
        const order = arrayMove(props.data.map((group) => group.id), from, to);

        await updatePortfolioCategory.mutateAsync({
            id: props.parent.id,
            value: {
                portfolioGroups: {
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
            <PortfolioGroupsCreateDialog
                onCreate={handleUpdate}
                parent={props.parent}
            >
                <Button
                    className="grow"
                >
                    New
                </Button>
            </PortfolioGroupsCreateDialog>
            <Button
                variant="secondary"
                disabled={!selected}
                onClick={() => router.push(A_PORTFOLIO_GROUPS_$ID(selected!.id))}
                className="grow"
            >
                Open
            </Button>
            <PortfolioGroupsEditDialog
                value={selected}
                onEdit={handleUpdate}
            >
                <Button
                    variant="secondary"
                    disabled={!selected}
                    className="grow"
                >
                    Edit
                </Button>
            </PortfolioGroupsEditDialog>
            <PortfolioGroupsDeleteDialog
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
            </PortfolioGroupsDeleteDialog>
        </SortableList>
    );
}
