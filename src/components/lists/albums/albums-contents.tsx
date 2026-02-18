"use client";

import {
    useMemo,
    useState,
    useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Img } from "@/components/snippets";
import { dateToString } from "@shared/snippets";
import { SortableList } from "../sortable";
import { PartialAlbumsContent } from "@type/albums/contents";
import { Album } from "@type/albums/albums";
import { GripVertical } from "lucide-react";
import {
    DndSortable,
    arrayMove,
} from "@client/dnd";
import { useAlbums } from "@/hooks/albums/useAlbums";
// import { usePortfolioMedia } from "@/hooks/portfolio/usePortfolioMedia";
// import { PortfolioGroupsCreateDialog } from "@/components/dialogs/portfolio/portfolio-groups-create";
// import { PortfolioGroupsEditDialog } from "@/components/dialogs/portfolio/portfolio-groups-edit";
// import { PortfolioGroupsDeleteDialog } from "@/components/dialogs/portfolio/portfolio-groups-delete";
import {
    useRouter,
    // A_PORTFOLIO_GROUPS_$ID,
    PLACEHOLDER,
} from "@shared/i18n";

interface ListEntryProps {
    value: PartialAlbumsContent;
    sortable: DndSortable;
    disabled?: boolean;
}

function ListEntry(props: ListEntryProps) {
    // const { usePortfolioMedia: useMedia } = usePortfolioMedia();
    // const { data } = useMedia(props.value.portfolioMediaIds.length > 0 ? props.value.portfolioMediaIds[0] : "null");
    // const image = useMemo(() => data && data.portfolioMediaVariants.length > 0 ? data.portfolioMediaVariants[0].fileUrl : PLACEHOLDER, [data]);
    const image = PLACEHOLDER;

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
                        <div className="flex gap-2">
                            <span className="p5">{props.value.location}</span>
                            {
                                props.value.location && props.value.description && (
                                    <Separator orientation="vertical" />
                                )
                            }
                            <span className="p5">{props.value.description}</span>
                        </div>
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
                            size="icon-lg"
                            variant="link"
                            {...props.sortable.listeners}
                        >
                            <GripVertical />
                        </Button>
                    </div>
                )
            }
        </div>
    );
}

interface ListProps {
    data: PartialAlbumsContent[];
    onUpdate?: () => void;
    parent?: Album;
}

export function AlbumsContentsList(props: ListProps) {
    const router = useRouter();

    const [data, setData] = useState<PartialAlbumsContent[]>(props.data);
    useEffect(() => setData(props.data), [props.data]);

    const [selected, setSelected] = useState<PartialAlbumsContent>();
    const { updateAlbum } = useAlbums();

    const handleSelect = (value: PartialAlbumsContent) => {
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

        await updateAlbum.mutateAsync({
            id: props.parent.id,
            value: {
                // portfolioGroups: {
                //     set: order,
                // },
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
            {/* <PortfolioGroupsCreateDialog
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
            </PortfolioGroupsDeleteDialog> */}
        </SortableList>
    );
}
