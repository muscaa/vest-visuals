"use client";

import { MainAdmin } from "@/components/admin/main";
import { useQuery } from "@tanstack/react-query";
import {
    useMemo,
    useState,
} from "react";
import * as types from "@/types/api/media/categories";
import { api_routes } from "@/utils/client/axios";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Img } from "@/components/snippets";
import { myDate } from "@/utils/snippets";
import { List } from "@/components/list";

interface ListEntryProps {
    value: types.Value;
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
                        <p>{props.value.category}</p>
                        <h6>Updated: {myDate(props.value.updated)}</h6>
                        <h6>Created: {myDate(props.value.created)}</h6>
                    </div>
                    {/* <div className="flex flex-col justify-center items-center">
                        <p>{props.value.mediaVariants?.length || "no"}</p>
                        <h5>items</h5>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    const router = useRouter();
    const [selected, setSelected] = useState<types.Value>();

    const { data, refetch } = useQuery({
        queryKey: [api_routes.media.categories._.url],
        queryFn: async () => {
            const { data } = await api_routes.media.categories._.post({});

            if (!data.success) return [];

            return data.values || [];
        },
    });

    const handleSelect = (value: types.Value) => {
        setSelected(selected?.id == value.id ? undefined : value);
    };

    const handleUpdate = () => {
        setSelected(undefined);

        refetch();
    };

    return (
        <MainAdmin extraClassName="overflow-hidden">
            <List
                data={data}
                isSelected={(value) => selected?.id == value.id}
                onSelect={handleSelect}
                entry={(value) => <ListEntry value={value} />}
            >
                {/* <MediaGroupsCreateDialog
                    onCreate={handleUpdate}
                >
                    <Button
                        className="grow"
                    >
                        New
                    </Button>
                </MediaGroupsCreateDialog> */}
                <Button
                    variant="secondary"
                    disabled={!selected}
                    onClick={() => router.push(`/a/media/groups/${selected?.id}`)}
                    className="grow"
                >
                    Open
                </Button>
                {/* <MediaGroupsEditDialog
                    record={selected}
                    onEdit={handleUpdate}
                >
                    <Button
                        variant="secondary"
                        disabled={!selected}
                        className="grow"
                    >
                        Edit
                    </Button>
                </MediaGroupsEditDialog>
                <MediaGroupsDeleteDialog
                    record={selected}
                    onDelete={handleUpdate}
                >
                    <Button
                        variant="secondary"
                        disabled={!selected}
                        className="grow"
                    >
                        Delete
                    </Button>
                </MediaGroupsDeleteDialog> */}
            </List>
        </MainAdmin>
    );
}
