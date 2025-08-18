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

interface ListEntryProps {
    value: MediaGroup;
}

function ListEntry(props: ListEntryProps) {
    const { getMediaContent } = useMediaContents();
    const { data } = getMediaContent(props.value.mediaContents.length > 0 ? props.value.mediaContents[0] : "null");
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
                    <div className="flex flex-col grow">
                        <h6>Updated: {myDate(props.value.updated)}</h6>
                        <h6>Created: {myDate(props.value.created)}</h6>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p>{props.value.mediaContents?.length || "no"}</p>
                        <h5>items</h5>
                    </div>
                </div>
            </div>
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

    const handleSelect = (value: MediaGroup) => {
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
    const { getMediaGroups } = useMediaGroups();
    const { data, refetch } = getMediaGroups();

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
