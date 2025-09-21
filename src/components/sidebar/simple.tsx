"use client";

import {
    Sidebar,
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { Icon } from "../snippets";
import { LogoLink } from "../logo";
import Link from "next/link";
import { cn } from "@shared/shadcn/lib/utils";

interface SimpleSidebarMenuItemProps {
    href?: string;
    text?: string;
    icon?: Icon;
    children?: React.ReactNode;
}

export function SimpleSidebarMenuItem(props: SimpleSidebarMenuItemProps) {
    return (
        <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
                {
                    props.href && (
                        <Link href={props.href}>
                            {props.icon && <props.icon />}
                            <span>{props.text}</span>
                        </Link>
                    ) || (
                        props.children
                    )
                }
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    );
}

interface SimpleSidebarMenuProps {
    title: string;
    icon?: Icon;
    children?: React.ReactNode;
}

export function SimpleSidebarMenu(props: SimpleSidebarMenuProps) {
    return (
        <Collapsible
            asChild
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={props.title}>
                        {props.icon && <props.icon />}
                        <span>{props.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {props.children}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}

interface SimpleSidebarItemProps {
    href?: string;
    text?: string;
    icon?: Icon;
    children?: React.ReactNode;
}

export function SimpleSidebarItem(props: SimpleSidebarItemProps) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                {
                    props.href && (
                        <Link href={props.href}>
                            {props.icon && <props.icon />}
                            <span>{props.text}</span>
                        </Link>
                    ) || (
                        props.children
                    )
                }
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

interface SimpleSidebarGroupProps {
    title?: string;
    children?: React.ReactNode;
}

export function SimpleSidebarGroup(props: SimpleSidebarGroupProps) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{props.title}</SidebarGroupLabel>
            <SidebarMenu>
                {props.children}
            </SidebarMenu>
        </SidebarGroup>
    );
}

interface SimpleSidebarProps {
    children?: React.ReactNode;
    footer?: React.ReactNode;
}

export function SimpleSidebar(props: SimpleSidebarProps) {
    return (
        <Sidebar
            collapsible="icon"
            {...props}
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <LogoLink />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {props.children}
            </SidebarContent>
            <SidebarFooter>
                {props.footer}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

interface SimpleSidebarProviderProps {
    sidebar: React.ReactNode;
    className?: string;
    extraClassName?: string;
    children?: React.ReactNode;
}

export function SimpleSidebarProvider(props: SimpleSidebarProviderProps) {
    return (
        <SidebarProvider>
            {props.sidebar}
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className={cn("flex flex-col max-h-full h-full overflow-y-auto", props.className)}>
                    <main className={cn("grow", props.extraClassName)}>
                        {props.children}
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
