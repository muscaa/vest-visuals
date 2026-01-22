"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { dateToString } from "@shared/snippets";
import { SimpleList } from "./simple";
import { PartialPortfolioCategory } from "@type/portfolio/categories";
import { MediaCategoriesCreateDialog } from "@/components/dialogs/media-categories-create";
import { MediaCategoriesEditDialog } from "@/components/dialogs/media-categories-edit";
import { MediaCategoriesDeleteDialog } from "@/components/dialogs/media-categories-delete";

interface ListEntryProps {
    value: PartialPortfolioCategory;
}

function ListEntry(props: ListEntryProps) {
    return (
        <div className="flex flex-wrap gap-4 size-full whitespace-normal">
            <div className="flex flex-col gap-1 grow">
                <h4>{props.value.tag}</h4>
                <Separator />
                <div className="flex gap-2 text-muted-foreground">
                    <div className="flex flex-col gap-2 grow">
                        <p>{props.value.id}</p>
                        <div className="flex flex-col">
                            <h6>Updated: {dateToString(props.value.updatedAt)}</h6>
                            <h6>Created: {dateToString(props.value.createdAt)}</h6>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p>{props.value.portfolioGroupIds.length || "no"}</p>
                        <h5>items</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface MediaGroupsListProps {
    data: PartialPortfolioCategory[];
    onUpdate?: () => void;
}

export function MediaCategoriesList(props: MediaGroupsListProps) {
    const router = useRouter();
    const [selected, setSelected] = useState<PartialPortfolioCategory>();

    const handleSelect = (value: PartialPortfolioCategory) => {
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
            <MediaCategoriesCreateDialog
                onCreate={handleUpdate}
            >
                <Button
                    className="grow"
                >
                    New
                </Button>
            </MediaCategoriesCreateDialog>
            <Button
                variant="secondary"
                disabled={!selected}
                onClick={() => router.push(`/a/media/categories/${selected?.id}`)}
                className="grow"
            >
                Open
            </Button>
            <MediaCategoriesEditDialog
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
            </MediaCategoriesEditDialog>
            <MediaCategoriesDeleteDialog
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
            </MediaCategoriesDeleteDialog>
        </SimpleList>
    );
}
