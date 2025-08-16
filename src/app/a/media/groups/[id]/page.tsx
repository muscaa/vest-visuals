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
import { useMediaGroups } from "@/hooks/useMediaGroups";

export default function Page() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const [selected, setSelected] = useState<string>();
    const { getMediaGroup } = useMediaGroups();
    const { data, refetch } = getMediaGroup(params.id);

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
                data={data?.media}
                isSelected={(value) => selected == value}
                onSelect={handleSelect}
                entry={(value) => <p>{value}</p>}
            >
                <Button
                    className="grow"
                >
                    New
                </Button>
                <Button
                    variant="secondary"
                    disabled={!selected}
                    onClick={() => router.push(`/a/media/groups/${selected}`)}
                    className="grow"
                >
                    Open
                </Button>
                <Button
                    variant="secondary"
                    disabled={!selected}
                    className="grow"
                >
                    Delete
                </Button>
            </List>
        </MainAdmin>
    );
}
