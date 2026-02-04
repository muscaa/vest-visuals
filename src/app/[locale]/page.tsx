"use client";

import { Suspense } from "react";
import { SectionsMain } from "@/components/sections/main";

export default function Page() {
    return (
        <Suspense>
            <SectionsMain />
        </Suspense>
    );
}
