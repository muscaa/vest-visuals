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
import { useMediaContents } from "@/hooks/useMediaContents";
import { MediaContent } from "@/types/api/media/contents";
import { FullMediaGroup } from "@/types/api/media/groups";
import { Loading } from "@/components/status";

interface ListEntryProps {
    value: MediaContent;
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
                <h4>{props.value.id}</h4>
                <Separator />
                <div className="flex gap-2 text-muted-foreground">
                    <div className="flex flex-col grow">
                        <p>{props.value.id}</p>
                        <h6>Updated: {myDate(props.value.updated)}</h6>
                        <h6>Created: {myDate(props.value.created)}</h6>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p>{props.value.mediaVariants?.length || "no"}</p>
                        <h5>items</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface MediaContentsListProps {
    data: MediaContent[];
    refetch?: () => void;
    parent?: FullMediaGroup;
}

export function MediaContentsList(props: MediaContentsListProps) {
    const router = useRouter();
    const [selected, setSelected] = useState<MediaContent>();

    const handleSelect = (value: MediaContent) => {
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
            {/* <MediaGroupsCreateDialog
                onCreate={handleUpdate}
                parent={props.parent}
            > */}
            <Button
                className="grow"
            >
                New
            </Button>
            {/* </MediaGroupsCreateDialog> */}
            <Button
                variant="secondary"
                disabled={!selected}
                onClick={() => router.push(`/a/media/groups/${selected?.id}`)}
                className="grow"
            >
                Open
            </Button>
            {/* <MediaGroupsDeleteDialog
                value={selected}
                onDelete={handleUpdate}
            > */}
            <Button
                variant="secondary"
                disabled={!selected}
                className="grow"
            >
                Delete
            </Button>
            {/* </MediaGroupsDeleteDialog> */}
        </List>
    );
}

export default function Page() {
    const { getMediaContents } = useMediaContents();
    const { data, refetch } = getMediaContents();

    return (
        <MainAdmin extraClassName="overflow-hidden">
            {
                data && (
                    <MediaContentsList
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
