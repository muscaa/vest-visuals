"use client";

import { useAdmin } from "@/hooks/useAdmin";
import {
    SimpleSidebarGroup,
    SimpleSidebarItem,
    SimpleSidebarMenu,
    SimpleSidebarMenuItem,
} from "../simple";
import {
    Terminal,
    Box,
    Users,
    Image,
    FileBox,
} from "lucide-react";

interface SidebarNavAdminProps {

}

export function SidebarNavAdmin(props: SidebarNavAdminProps) {
    const { openMinio } = useAdmin();

    return (
        <SimpleSidebarGroup title="Admin">
            <SimpleSidebarItem
                href="/a/cli"
                text="CLI"
                icon={Terminal}
            />
            <SimpleSidebarItem
                onClick={openMinio.mutate}
                text="Minio"
                icon={Box}
            />
            <SimpleSidebarItem
                href="/a/users"
                text="Users"
                icon={Users}
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
            <SimpleSidebarMenu
                title="Registries"
                icon={FileBox}
            >
                <SimpleSidebarMenuItem
                    href="/a/registries/team"
                    text="Team"
                />
                <SimpleSidebarMenuItem
                    href="/a/registries/portfolio"
                    text="Portfolio"
                />
            </SimpleSidebarMenu>
        </SimpleSidebarGroup>
    );
}
