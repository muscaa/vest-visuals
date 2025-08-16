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
            <p>{JSON.stringify(data, null, 2)}</p>
        </MainAdmin>
    );
}
