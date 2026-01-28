"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

function ThemeOption() {
    return (
        <div className="flex items-center gap-2">
            <p>Theme</p>
            <ThemeToggle />
        </div>
    );
}

export default function Page() {
    useBreadcrumbs([
        "Preferences",
    ]);

    return (
        <div className="flex flex-col size-full">
            <ThemeOption />
        </div>
    );
}
