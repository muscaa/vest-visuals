"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { ThemeToggle } from "@/components/theme/theme-toggle";

function ThemeOption() {
    return (
        <div className="flex items-center gap-2">
            <p>Theme</p>
            <ThemeToggle />
        </div>
    );
}

export default function Page() {
    return (
        <MainSidebarProvider
            breadcrumbs={{
                page: "Preferences",
            }}
        >
            <div className="flex flex-col size-full">
                <ThemeOption />
            </div>
        </MainSidebarProvider>
    );
}
