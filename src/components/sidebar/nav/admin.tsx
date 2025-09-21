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
                    href="#"
                    text="Categories"
                />
                <SimpleSidebarMenuItem
                    href="#"
                    text="Groups"
                />
                <SimpleSidebarMenuItem
                    href="#"
                    text="Contents"
                />
            </SimpleSidebarMenu>
        </SimpleSidebarGroup>
    );
}
