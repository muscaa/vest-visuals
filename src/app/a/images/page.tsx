"use client";

import { MainAdmin } from "@/components/admin/main";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import * as types from "@/types/api/images";
import { ImagesItem } from "@/types/db/images";

interface ImagesItemEntryProps {
    item: ImagesItem;
}

function ImagesItemEntry(props: ImagesItemEntryProps) {
    return (
        <div className="flex flex-col">
            <h4>{props.item.alt}</h4>
            <p>{props.item.src}</p>
        </div>
    );
}

export default function Page() {
    const [filter, setFilter] = useState<string>();
    const [sort, setSort] = useState<string>();

    const { data } = useQuery({
        queryKey: ["images", filter, sort],
        queryFn: async () => {
            const response = await fetch("/api/images", {
                method: "POST",
                body: JSON.stringify({
                    filter,
                    sort,
                } as types.PostRequest),
            });
            const json: types.PostResponse = await response.json();

            if (json.success) {
                return json.value
                    ?.map((record) => record.items)
                    .flatMap((items) => items.map((item) => ({
                        ...item,
                    }))) || [];
            }

            return [];
        },
    });

    return (
        <MainAdmin>
            <div className="flex justify-center items-center size-full bg-red-400">


                {/*<div className="flex flex-col max-w-md w-full gap-2 p-2">
                    {
                        data && (
                            data.map((item, index) => (
                                <ImagesItemEntry
                                    key={index}
                                    item={item}
                                />
                            ))
                        )
                    }
                </div>*/}
            </div>
        </MainAdmin>
    );
}
