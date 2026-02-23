"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { dateToString } from "@shared/snippets";
import { SimpleList } from "../simple";
import { PartialAlbum } from "@type/albums/albums";
import { AlbumsCreateDialog } from "@/components/dialogs/albums/albums-create";
import { AlbumsEditDialog } from "@/components/dialogs/albums/albums-edit";
import { AlbumsDeleteDialog } from "@/components/dialogs/albums/albums-delete";
import {
    useRouter,
    A_ALBUMS_$ID_$PATH,
} from "@shared/i18n";
import { useAlbumsContents } from "@/hooks/albums/useAlbumsContents";

interface ListEntryProps {
    value: PartialAlbum;
}

function ListEntry(props: ListEntryProps) {
    const { useAlbumsContentsByAlbumId } = useAlbumsContents();
    const { data } = useAlbumsContentsByAlbumId(props.value.id);

    return (
        <div className="flex flex-wrap gap-4 size-full whitespace-normal">
            <div className="flex flex-col gap-1 grow">
                <h4>{props.value.id}</h4>
                <Separator />
                <div className="flex gap-2 text-muted-foreground">
                    <div className="flex flex-col gap-2 grow">
                        <div className="flex flex-col">
                            <p>{props.value.title}</p>
                            <p>{props.value.description}</p>
                            <p>{props.value.cover}</p>
                        </div>
                        <div className="flex flex-col">
                            <h6>Updated: {dateToString(props.value.updatedAt)}</h6>
                            <h6>Created: {dateToString(props.value.createdAt)}</h6>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p>{data?.length || "no"}</p>
                        <h5>items</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ListProps {
    data: PartialAlbum[];
    onUpdate?: () => void;
}

export function AlbumsList(props: ListProps) {
    const router = useRouter();
    const [selected, setSelected] = useState<PartialAlbum>();

    const handleSelect = (value: PartialAlbum) => {
        setSelected(selected?.id == value.id ? undefined : value);
    };

    const handleUpdate = () => {
        setSelected(undefined);

        props.onUpdate?.();
    };

    return (
        <SimpleList
            data={props.data}
            entry={(value) => <ListEntry value={value} />}
            isSelected={(value) => selected?.id == value.id}
            onSelect={handleSelect}
        >
            <AlbumsCreateDialog
                onCreate={handleUpdate}
            >
                <Button
                    className="grow"
                >
                    New
                </Button>
            </AlbumsCreateDialog>
            <Button
                variant="secondary"
                disabled={!selected}
                onClick={() => router.push(A_ALBUMS_$ID_$PATH(selected!.id))}
                className="grow"
            >
                Open
            </Button>
            <AlbumsEditDialog
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
            </AlbumsEditDialog>
            <AlbumsDeleteDialog
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
            </AlbumsDeleteDialog>
        </SimpleList>
    );
}
