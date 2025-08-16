"use client";

import { MainAdmin } from "@/components/admin/main";
import {
    useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
    useParams,
    useRouter,
} from "next/navigation";
import { List } from "@/components/list";
import { useMediaCategories } from "@/hooks/useMediaCategories";
import { MediaGroupsCreateDialog } from "@/components/dialogs/media-groups-create";
import { MediaGroupsDeleteDialog } from "@/components/dialogs/media-groups-delete";

export default function Page() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const [selected, setSelected] = useState<string>();
    const { getMediaCategory } = useMediaCategories();
    const { data, refetch } = getMediaCategory(params.id);

    const handleSelect = (value: string) => {
        setSelected(selected == value ? undefined : value);
    };

    const handleUpdate = () => {
        setSelected(undefined);

        refetch();
    };

    return (
        <MainAdmin extraClassName="overflow-hidden">
            <List
                data={data?.mediaGroups}
                isSelected={(value) => selected == value}
                onSelect={handleSelect}
                entry={(value) => <p>{value}</p>}
            >
                <MediaGroupsCreateDialog
                    onCreate={handleUpdate}
                    category={data!}
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
                    onClick={() => router.push(`/a/media/groups/${selected}`)}
                    className="grow"
                >
                    Open
                </Button>
                <MediaGroupsDeleteDialog
                    value={{id: selected} as any}
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
        </MainAdmin>
    );
}
