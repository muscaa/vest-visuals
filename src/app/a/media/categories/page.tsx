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
import { Value } from "@/types/api/media/categories";
import { MediaCategoriesCreateDialog } from "@/components/dialogs/media-categories-create";
import { MediaCategoriesEditDialog } from "@/components/dialogs/media-categories-edit";
import { MediaCategoriesDeleteDialog } from "@/components/dialogs/media-categories-delete";
import { Loading } from "@/components/status";

interface ListEntryProps {
    value: Value;
}

function ListEntry(props: ListEntryProps) {
    const image = useMemo(() => {
        /*if (props.value.expand && props.value.expand.mediaVariants && props.value.expand.mediaVariants.length > 0) {
            const mediaVariant = props.value.expand.mediaVariants[0];

            if (mediaVariant.expand && mediaVariant.expand.media && mediaVariant.expand.media.length > 0) {
                const media = mediaVariant.expand.media[0];

                return media.file;
            }
        }*/

        return "/placeholder0.png";
    }, [props.value]);

    return (
        <div className="flex flex-wrap gap-4 size-full whitespace-normal">
            <Img
                src={image}
                alt="Preview"
                width={128}
                height={128}
                className="size-32 object-contain"
            />
            <div className="flex flex-col gap-1 grow">
                <h4>{props.value.category}</h4>
                <Separator />
                <div className="flex gap-2 text-muted-foreground">
                    <div className="flex flex-col grow">
                        <p>{props.value.id}</p>
                        <h6>Updated: {myDate(props.value.updated)}</h6>
                        <h6>Created: {myDate(props.value.created)}</h6>
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
    data: Value[];
    refetch?: () => void;
}

export function MediaCategoriesList(props: MediaGroupsListProps) {
    const router = useRouter();
    const [selected, setSelected] = useState<Value>();

    const handleSelect = (value: Value) => {
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
