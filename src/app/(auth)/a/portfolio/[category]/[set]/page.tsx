"use client";

import { Main } from "@/components/main";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams<{
        category: string;
        set: string;
    }>();

    return (
        <Main>
            <div className="flex flex-col justify-center items-center size-full p-2">
                <p>{params.category}</p>
                <p>{params.set}</p>
            </div>
        </Main>
    );
}
