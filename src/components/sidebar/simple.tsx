"use client";

import {
    Sidebar,
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
import { ChevronRight } from "lucide-react";
import { Icon } from "../snippets";
import { LogoLink } from "../logo";
import { splitRender } from "@client/snippets";
import { Link } from "@shared/i18n";

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
