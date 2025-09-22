"use client";

import {
    SimpleSidebarGroup,
    SimpleSidebarItem,
    SimpleSidebarMenu,
    SimpleSidebarMenuItem,
} from "../simple";
import {
    Terminal,
    Box,
    Image,
} from "lucide-react";

interface SidebarNavAdminProps {

}

export function SidebarNavAdmin(props: SidebarNavAdminProps) {
    return (
        <SimpleSidebarGroup title="Admin">
            <SimpleSidebarItem
                href="/a/cli"
                text="CLI"
                icon={Terminal}
            />
            <SimpleSidebarItem
                href="#"
                text="Minio"
                icon={Box}
            />
            <SimpleSidebarMenu
                title="Media"
                icon={Image}
            >
                <SimpleSidebarMenuItem
                    href="/a/media/categories"
                    text="Categories"
                />
                <SimpleSidebarMenuItem
                    href="/a/media/groups"
                    text="Groups"
                />
                <SimpleSidebarMenuItem
                    href="/a/media/contents"
                    text="Contents"
                />
            </SimpleSidebarMenu>
        </SimpleSidebarGroup>
    );
}
