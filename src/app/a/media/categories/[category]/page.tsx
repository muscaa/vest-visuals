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
import {
    useParams,
    useRouter,
} from "next/navigation";
import { List } from "@/components/list";

export default function Page() {
    const router = useRouter();
    const params = useParams<{ category: string }>();
    const [selected, setSelected] = useState<string>();

    const { data, refetch } = useQuery({
        queryKey: [api_routes.media.categories.get._.url],
        queryFn: async () => {
            const { data } = await api_routes.media.categories.get._.post({
                category: params.category,
            });

            if (!data.success) return [];

            return data.value?.mediaGroups || [];
        },
    });

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
                data={data}
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
