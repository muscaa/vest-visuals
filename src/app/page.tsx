"use server";

import { Suspense } from "react";
import { SectionsMain } from "@/components/sections/main";

export default async function Page() {
    return (
        <Suspense>
            <SectionsMain />
        </Suspense>
    );
}
