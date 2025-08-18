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
import { useMediaGroups } from "@/hooks/useMediaGroups";
import { MediaGroup } from "@/types/api/media/groups";
import { FullMediaCategory } from "@/types/api/media/categories";
import { MediaGroupsCreateDialog } from "@/components/dialogs/media-groups-create";
import { MediaGroupsDeleteDialog } from "@/components/dialogs/media-groups-delete";
import { Loading } from "@/components/status";
import { useMediaContents } from "@/hooks/useMediaContents";
import {
    ChevronUp,
    ChevronDown,
} from "lucide-react";
import { useMediaCategories } from "@/hooks/useMediaCategories";

interface ListEntryProps {
    value: MediaGroup;
    movable?: boolean;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
}

function ListEntry(props: ListEntryProps) {
    const { useMediaContent } = useMediaContents();
    const { data } = useMediaContent(props.value.mediaContents.length > 0 ? props.value.mediaContents[0] : "null");
    const image = useMemo(() => data && data.mediaVariants.length > 0 ? data.mediaVariants[0].file : "/placeholder0.png", [data]);

    return (
        <div className="flex flex-wrap gap-4 size-full whitespace-normal">
            <Img
                src={image}
                alt="Preview"
                width={128}
                height={128}
                className="size-32 object-contain"
            />
            <div className="flex flex-col gap-1 grow text-foreground">
                <h4>{props.value.id}</h4>
                <Separator />
                <div className="flex gap-2 text-muted-foreground">
                    <div className="flex flex-col gap-2 grow">
                        <div className="flex flex-col">
                            <h6>Updated: {myDate(props.value.updated)}</h6>
                            <h6>Created: {myDate(props.value.created)}</h6>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p>{props.value.mediaContents?.length || "no"}</p>
                        <h5>items</h5>
                    </div>
                </div>
            </div>
            {
                props.movable && (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Button
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                props.onMoveUp?.();
                            }}
                        >
                            <ChevronUp />
                        </Button>
                        <Button
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                props.onMoveDown?.();
                            }}
                        >
                            <ChevronDown />
                        </Button>
                    </div>
                )
            }
        </div>
    );
}

interface MediaGroupsListProps {
    data: MediaGroup[];
    refetch?: () => void;
    parent?: FullMediaCategory;
}

export function MediaGroupsList(props: MediaGroupsListProps) {
    const router = useRouter();
    const [selected, setSelected] = useState<MediaGroup>();
    const { updateMediaCategory } = useMediaCategories();

    const handleSelect = (value: MediaGroup) => {
        setSelected(selected?.id == value.id ? undefined : value);
    };

    const handleUpdate = () => {
        setSelected(undefined);

        props.refetch?.();
    };

    const handleMoveUp = async (index: number) => {
        if (!props.parent || props.data.length <= 1 || index <= 0) return;

        const order = props.data.map((group) => group.id);
        const temp = order[index - 1];
        order[index - 1] = order[index];
        order[index] = temp;

        await updateMediaCategory.mutateAsync({
            id: props.parent.id,
            mediaGroups: {
                set: order,
            },
        });

        handleUpdate();
    };

    const handleMoveDown = async (index: number) => {
        if (!props.parent || props.data.length <= 1 || index >= props.data.length - 1) return;

        const order = props.data.map((group) => group.id);
        const temp = order[index + 1];
        order[index + 1] = order[index];
        order[index] = temp;

        await updateMediaCategory.mutateAsync({
            id: props.parent.id,
            mediaGroups: {
                set: order,
            },
        });

        handleUpdate();
    };

    return (
        <List
            data={props.data}
            isSelected={(value) => selected?.id == value.id}
            onSelect={handleSelect}
            entry={(value, index) => (
                <ListEntry
                    value={value}
                    movable={props.parent != null}
                    onMoveUp={() => handleMoveUp(index)}
                    onMoveDown={() => handleMoveDown(index)}
                />
            )}
        >
            <MediaGroupsCreateDialog
                onCreate={handleUpdate}
                parent={props.parent}
            >
                <Button
                    className="grow"
                >
                    New
                </Button>
            </MediaGroupsCreateDialog>
            <Button
                variant="secondary"
                disabled={!selected}
                onClick={() => router.push(`/a/media/groups/${selected?.id}`)}
                className="grow"
            >
                Open
            </Button>
            <MediaGroupsDeleteDialog
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
            </MediaGroupsDeleteDialog>
        </List>
    );
}

export default function Page() {
    const { useAllMediaGroups } = useMediaGroups();
    const { data, refetch } = useAllMediaGroups();

    return (
        <MainAdmin extraClassName="overflow-hidden">
            {
                data && (
                    <MediaGroupsList
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
