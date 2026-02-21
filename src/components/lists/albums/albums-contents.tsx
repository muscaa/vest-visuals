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
import {
    Folder,
    GripVertical,
} from "lucide-react";
import {
    DndSortable,
    arrayMove,
} from "@client/dnd";
import { useAlbumsContents } from "@/hooks/albums/useAlbumsContents";
import { useAlbumsMedia } from "@/hooks/albums/useAlbumsMedia";
import { AlbumsContentsCreateDialog } from "@/components/dialogs/albums/albums-contents-create";
import { AlbumsContentsEditDialog } from "@/components/dialogs/albums/albums-contents-edit";
import { AlbumsContentsDeleteDialog } from "@/components/dialogs/albums/albums-contents-delete";
import {
    useRouter,
    A_ALBUMS_$ID_$PATH,
    PLACEHOLDER,
} from "@shared/i18n";
import { TextLink } from "@/components/ui/text-link";
import { useAlbumsDirectories } from "@/hooks/albums/useAlbumsDirectories";

interface ListEntryProps {
    value: PartialAlbumsContent;
    sortable: DndSortable;
    disabled?: boolean;
}

function MediaListEntry(props: ListEntryProps) {
    const { useAlbumsMedia: useMedia } = useAlbumsMedia();
    const { data } = useMedia(props.value.albumId, props.value.id);
    const image = useMemo(() => data && data.albumsMediaVariants.length > 0 ? data.albumsMediaVariants[0].fileUrl : PLACEHOLDER, [data]);

    if (!data) {
        return (
            <span>Invalid media</span>
        );
    }

    return (
        <div className="flex flex-wrap gap-4 size-full whitespace-normal">
            <Img
                src={image}
                alt="Preview"
                className="size-32 object-contain"
            />
            <div className="flex flex-col gap-1 grow text-foreground">
                <h4>{props.value.path}</h4>
                <Separator />
                <div className="flex gap-2 text-muted-foreground">
                    <div className="flex flex-col gap-2 grow">
                        <div className="flex gap-2 items-center">
                            {
                                data.albumsMediaVariants.map((variant, index) => (
                                    <TextLink
                                        key={index}
                                        href={variant.fileUrl}
                                        target="_blank"
                                    >
                                        {variant.tag}
                                    </TextLink>
                                ))
                            }
                        </div>
                        <span className="p5">{props.value.id}</span>
                        <div className="flex flex-col">
                            <h6>Updated: {dateToString(props.value.updatedAt)}</h6>
                            <h6>Created: {dateToString(props.value.createdAt)}</h6>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p>{data.albumsMediaVariants?.length || "no"}</p>
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

function DirectoryListEntry(props: ListEntryProps) {
    const { useAlbumsDirectory } = useAlbumsDirectories();
    const { data } = useAlbumsDirectory(props.value.albumId, props.value.id);
    // const image = useMemo(() => data && data.albumsMediaVariants.length > 0 ? data.albumsMediaVariants[0].fileUrl : PLACEHOLDER, [data]);

    if (!data) {
        return (
            <span>Invalid directory</span>
        );
    }

    return (
        <div className="flex flex-wrap items-center gap-4 size-full whitespace-normal">
            {
                props.value.type === "media" && (
                    <Img
                        // src={image}
                        alt="Preview"
                        className="size-32 object-contain"
                    />
                ) || props.value.type === "directory" && (
                    <Folder
                        className="size-16 text-muted-foreground"
                    />
                )
            }
            <div className="flex flex-col gap-1 grow text-foreground">
                <h4>{props.value.path}</h4>
                <Separator />
                <div className="flex gap-2 text-muted-foreground">
                    <div className="flex flex-col gap-2 grow">
                        <span className="p5">{props.value.id}</span>
                        <div className="flex flex-col">
                            <h6>Updated: {dateToString(props.value.updatedAt)}</h6>
                            <h6>Created: {dateToString(props.value.createdAt)}</h6>
                        </div>
                    </div>
                    {/* <div className="flex flex-col justify-center items-center">
                        <p>{"no"}</p>
                        <h5>items</h5>
                    </div> */}
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
    albumId: string;
    path?: string[];
}

export function AlbumsContentsList(props: ListProps) {
    const router = useRouter();

    const [data, setData] = useState<PartialAlbumsContent[]>(props.data);
    useEffect(() => setData(props.data), [props.data]);

    const [selected, setSelected] = useState<PartialAlbumsContent>();
    const { updateAlbumsContent } = useAlbumsContents();

    const handleSelect = (value: PartialAlbumsContent) => {
        setSelected(selected?.id == value.id ? undefined : value);
    };

    const handleUpdate = () => {
        setSelected(undefined);

        props.onUpdate?.();
    };

    const handleMove = async (from: number, to: number) => {
        setData((prev) => arrayMove(prev, from, to));
        const order = arrayMove(props.data.map((content) => content.id), from, to);

        await Promise.all(order.map(async (id, index) => {
            return await updateAlbumsContent.mutateAsync({
                id,
                value: {
                    order: index,
                },
            });
        }));

        handleUpdate();
    };

    return (
        <SortableList
            data={data}
            entry={(value, index, sortable) => (
                value.type === "media" && (
                    <MediaListEntry
                        value={value}
                        sortable={sortable}
                    />
                ) || value.type === "directory" && (
                    <DirectoryListEntry
                        value={value}
                        sortable={sortable}
                    />
                )
            )}
            entryToId={(value, index) => value.id}
            move={handleMove}
            isSelected={(value) => selected?.id == value.id}
            onSelect={handleSelect}
        >
            <AlbumsContentsCreateDialog
                onCreate={handleUpdate}
                albumId={props.albumId}
                parentPath={props.path}
            >
                <Button
                    className="grow"
                >
                    New
                </Button>
            </AlbumsContentsCreateDialog>
            <Button
                variant="secondary"
                disabled={!selected || selected.type !== "directory"}
                onClick={() => router.push(A_ALBUMS_$ID_$PATH(props.albumId, selected!.path.split("/")))}
                className="grow"
            >
                Open
            </Button>
            <AlbumsContentsEditDialog
                value={selected}
                onEdit={handleUpdate}
                albumId={props.albumId}
                parentPath={props.path}
            >
                <Button
                    variant="secondary"
                    disabled={!selected}
                    className="grow"
                >
                    Edit
                </Button>
            </AlbumsContentsEditDialog>
            <AlbumsContentsDeleteDialog
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
            </AlbumsContentsDeleteDialog>
        </SortableList>
    );
}
