"use client";

import { Main } from "@/components/main";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import * as types from "@/types/api/images";

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
        <Main>
            <div className="flex justify-center items-center size-full">
                <div className="flex flex-col max-w-md w-full gap-2 p-2">
                    {
                        data && (
                            data.map((item, index) => (
                                <div key={index} className="flex flex-col">
                                    <h4>{item.alt}</h4>
                                    <p>{item.src}</p>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </Main>
    );
}
