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
import { SimpleList } from "../simple";
import { AssetsMedia } from "@type/assets/media";
import { AssetsMediaUploadDialog } from "@/components/dialogs/assets/assets-media-upload";
import { AssetsMediaDeleteDialog } from "@/components/dialogs/assets/assets-media-delete";
import { PLACEHOLDER } from "@shared/paths";
import { TextLink } from "@/components/ui/text-link";

interface ListEntryProps {
    value: AssetsMedia;
}

function ListEntry(props: ListEntryProps) {
    const image = useMemo(() => props.value.assetsMediaVariants.length > 0 ? props.value.assetsMediaVariants[0].fileUrl : PLACEHOLDER, [props.value]);

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
                                props.value.assetsMediaVariants.map((variant, index) => (
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
                        <div className="flex flex-col">
                            <h6>Updated: {dateToString(props.value.updatedAt)}</h6>
                            <h6>Created: {dateToString(props.value.createdAt)}</h6>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p>{props.value.assetsMediaVariants?.length || "no"}</p>
                        <h5>items</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ListProps {
    data: AssetsMedia[];
    onUpdate?: () => void;
}

export function AssetsMediaList(props: ListProps) {
    const [data, setData] = useState<AssetsMedia[]>(props.data);
    useEffect(() => setData(props.data), [props.data]);

    const [selected, setSelected] = useState<AssetsMedia>();

    const handleSelect = (value: AssetsMedia) => {
        setSelected(selected?.id == value.id ? undefined : value);
    };

    const handleUpdate = () => {
        setSelected(undefined);

        props.onUpdate?.();
    };

    return (
        <SimpleList
            data={data}
            entry={(value, index) => (
                <ListEntry
                    value={value}
                />
            )}
            isSelected={(value) => selected?.id == value.id}
            onSelect={handleSelect}
        >
            <AssetsMediaUploadDialog
                onCreate={handleUpdate}
            >
                <Button
                    className="grow"
                >
                    Upload
                </Button>
            </AssetsMediaUploadDialog>
            <AssetsMediaDeleteDialog
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
            </AssetsMediaDeleteDialog>
        </SimpleList>
    );
}
