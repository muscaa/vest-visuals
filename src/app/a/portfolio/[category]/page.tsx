"use client";

import { Main } from "@/components/main";
import { useParams } from "next/navigation";

export default function Page() {
    const { category } = useParams<{ category: string; }>();

    return (
        <Main>
            <div className="flex justify-center size-full p-2">
            </div>
        </Main>
    );
}
