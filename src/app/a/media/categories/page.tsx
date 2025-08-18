"use client";

import { MainAdmin } from "@/components/admin/main";
import {
    useMemo,
    useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Img } from "@/components/snippets";
import { myDate } from "@/utils/snippets";
import { List } from "@/components/list";
import { useMediaCategories } from "@/hooks/useMediaCategories";
import { MediaCategory } from "@/types/api/media/categories";
import { MediaCategoriesCreateDialog } from "@/components/dialogs/media-categories-create";
import { MediaCategoriesEditDialog } from "@/components/dialogs/media-categories-edit";
import { MediaCategoriesDeleteDialog } from "@/components/dialogs/media-categories-delete";
import { Loading } from "@/components/status";

interface ListEntryProps {
    value: MediaCategory;
}

function ListEntry(props: ListEntryProps) {
    return (
        <div className="flex flex-wrap gap-4 size-full whitespace-normal">
            <div className="flex flex-col gap-1 grow">
                <h4>{props.value.category}</h4>
                <Separator />
                <div className="flex gap-2 text-muted-foreground">
                    <div className="flex flex-col gap-2 grow">
                        <p>{props.value.id}</p>
                        <div className="flex flex-col">
                            <h6>Updated: {myDate(props.value.updated)}</h6>
                            <h6>Created: {myDate(props.value.created)}</h6>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p>{props.value.mediaGroups?.length || "no"}</p>
                        <h5>items</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface MediaGroupsListProps {
    data: MediaCategory[];
    refetch?: () => void;
}

export function MediaCategoriesList(props: MediaGroupsListProps) {
    const router = useRouter();
    const [selected, setSelected] = useState<MediaCategory>();

    const handleSelect = (value: MediaCategory) => {
        setSelected(selected?.id == value.id ? undefined : value);
    };

    const handleUpdate = () => {
        setSelected(undefined);

        props.refetch?.();
    };

    return (
        <List
            data={props.data}
            isSelected={(value) => selected?.id == value.id}
            onSelect={handleSelect}
            entry={(value) => <ListEntry value={value} />}
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
        </List>
    );
}

export default function Page() {
    const { getMediaCategories } = useMediaCategories();
    const { data, refetch } = getMediaCategories();

    return (
        <MainAdmin extraClassName="overflow-hidden">
            {
                data && (
                    <MediaCategoriesList
                        data={data}
                        refetch={refetch}
                    />
                ) || (
                    <Loading />
                )
            }
        </MainAdmin>
    );
}
