"use client";

import { MainAdmin } from "@/components/admin/main";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams<{ group: string }>();

    return (
        <MainAdmin extraClassName="overflow-hidden">
            <div className="flex justify-center items-center size-full p-2">
                hello {params.group}
            </div>
        </MainAdmin>
    );
}
