"use client";

import { MainAdmin } from "@/components/admin/main";
import {
    useMemo,
    useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { ButtonLink, Img } from "@/components/snippets";
import { myDate } from "@/utils/snippets";
import { List } from "@/components/list";
import { useMediaContents } from "@/hooks/useMediaContents";
import { FullMediaContent } from "@/types/api/media/contents";
import { FullMediaGroup } from "@/types/api/media/groups";
import { Loading } from "@/components/status";
import { MediaContentsDeleteDialog } from "@/components/dialogs/media-contents-delete";
import { MediaContentsUploadDialog } from "@/components/dialogs/media-contents-upload";

interface ListEntryProps {
    value: FullMediaContent;
}

function ListEntry(props: ListEntryProps) {
    const image = useMemo(() => props.value.mediaVariants.length > 0 ? props.value.mediaVariants[0].file : "/placeholder0.png", [props.value]);

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
                        <div className="flex gap-2 items-center">
                            {
                                props.value.mediaVariants.map((variant, index) => (
                                    <ButtonLink
                                        key={index}
                                        href={variant.file}
                                        target="_blank"
                                        size="none"
                                        variant="link"
                                    >
                                        {variant.variant}
                                    </ButtonLink>
                                ))
                            }
                        </div>
                        <div className="flex flex-col">
                            <h6>Updated: {myDate(props.value.updated)}</h6>
                            <h6>Created: {myDate(props.value.created)}</h6>
                        </div>
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
    data: FullMediaContent[];
    refetch?: () => void;
    parent?: FullMediaGroup;
}

export function MediaContentsList(props: MediaContentsListProps) {
    const router = useRouter();
    const [selected, setSelected] = useState<FullMediaContent>();

    const handleSelect = (value: FullMediaContent) => {
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
            <MediaContentsUploadDialog
                onCreate={handleUpdate}
                parent={props.parent}
            >
                <Button
                    className="grow"
                >
                    Upload
                </Button>
            </MediaContentsUploadDialog>
            <MediaContentsDeleteDialog
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
            </MediaContentsDeleteDialog>
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
