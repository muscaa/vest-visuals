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
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { Icon } from "../snippets";
import { LogoLink } from "../logo";
import Link from "next/link";
import { cn } from "@shared/shadcn/lib/utils";
import {
    Breadcrumbs,
    BreadcrumbsProps,
} from "../breadcrumbs";
import { splitRender } from "@client/snippets";

interface SimpleSidebarMenuItemProps {
    href?: string;
    onClick?: () => void;
    text?: string;
    icon?: Icon;
    children?: React.ReactNode;
}

export function SimpleSidebarMenuItem(props: SimpleSidebarMenuItemProps) {
    return (
        <SidebarMenuSubItem>
            <SidebarMenuSubButton {...splitRender(
                props.href && (
                    <Link href={props.href}>
                        {props.icon && <props.icon />}
                        <span>{props.text}</span>
                    </Link>
                ) || props.onClick && (
                    <div
                        className="cursor-pointer"
                        onClick={props.onClick}
                    >
                        {props.icon && <props.icon />}
                        <span>{props.text}</span>
                    </div>
                ) || (
                    props.children
                )
            )} />
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
        <Collapsible render={
            <SidebarMenuItem className="group/collapsible">
                <CollapsibleTrigger render={
                    <SidebarMenuButton tooltip={props.title}>
                        {props.icon && <props.icon />}
                        <span>{props.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                } />
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {props.children}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        } />
    );
}

interface SimpleSidebarItemProps {
    href?: string;
    onClick?: () => void;
    text?: string;
    icon?: Icon;
    children?: React.ReactNode;
}

export function SimpleSidebarItem(props: SimpleSidebarItemProps) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton {...splitRender(
                props.href && (
                    <Link href={props.href}>
                        {props.icon && <props.icon />}
                        <span>{props.text}</span>
                    </Link>
                ) || props.onClick && (
                    <div
                        className="cursor-pointer"
                        onClick={props.onClick}
                    >
                        {props.icon && <props.icon />}
                        <span>{props.text}</span>
                    </div>
                ) || (
                    props.children
                )
            )} />
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
                            render={<LogoLink />}
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        />
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

export interface SimpleSidebarProviderProps {
    sidebar: React.ReactNode;
    breadcrumbs?: BreadcrumbsProps;
    className?: string;
    extraClassName?: string;
    children?: React.ReactNode;
}

export function SimpleSidebarProvider(props: SimpleSidebarProviderProps) {
    return (
        <SidebarProvider>
            {props.sidebar}
            <SidebarInset className="overflow-hidden">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        {
                            props.breadcrumbs && (
                                <>
                                    <Separator
                                        orientation="vertical"
                                        className="mr-2 data-[orientation=vertical]:h-4"
                                    />
                                    <Breadcrumbs
                                        {...props.breadcrumbs}
                                    />
                                </>
                            )
                        }
                    </div>
                </header>
                <div className={cn("flex flex-col max-h-full h-full overflow-y-auto", props.className)}>
                    <main className={cn("grow p-4 pt-0", props.extraClassName)}>
                        {props.children}
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
