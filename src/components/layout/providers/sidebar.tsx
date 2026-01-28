"use client";

import { cn } from "@shared/shadcn/lib/utils";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { DashboardSidebar } from "@/components/sidebar/dashboard";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { BreadcrumbsContextProvider } from "@/contexts/breadcrumbs";

function LayoutHeader() {
    const { breadcrumbs } = useBreadcrumbs();

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                {
                    breadcrumbs && (
                        <>
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <Breadcrumbs
                                list={breadcrumbs}
                            />
                        </>
                    )
                }
            </div>
        </header>
    );
}

export interface SimpleSidebarProviderProps {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
    className?: string;
    extraClassName?: string;
}

export function SidebarLayoutProvider(props: SimpleSidebarProviderProps) {
    return (
        <BreadcrumbsContextProvider>
            <SidebarProvider>
                {
                    props.sidebar ?? (
                        <DashboardSidebar />
                    )
                }
                <SidebarInset className="overflow-hidden">
                    <LayoutHeader />
                    <div className={cn("flex flex-col max-h-full h-full overflow-y-auto", props.className)}>
                        <main className={cn("grow p-4 pt-0 overflow-hidden", props.extraClassName)}>
                            {props.children}
                        </main>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </BreadcrumbsContextProvider>
    );
}
