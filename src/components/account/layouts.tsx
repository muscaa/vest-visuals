import { Outlet } from "@tanstack/react-router";
import { ScreenLayout } from "../layout/screen";
import { LanguageToggle } from "../language-toggle";
import { ThemeToggle } from "../theme";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AccountSidebar } from "./sidebar";

export function AccountScreenLayout() {
    return (
        <ScreenLayout>
            <Outlet />
        </ScreenLayout>
    );
}

/** The signed in part of the account site: sidebar on the left, a slim top bar and the page. */
export function AccountSidebarLayout() {
    return (
        <SidebarProvider className="h-full min-h-0">
            <AccountSidebar />
            <SidebarInset className="overflow-hidden">
                <header className="flex justify-between items-center gap-2 h-16 shrink-0 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex items-center gap-1">
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                </header>
                <div className="flex flex-col grow overflow-y-auto">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
