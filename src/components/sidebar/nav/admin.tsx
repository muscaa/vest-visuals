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
    Library,
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
            <SimpleSidebarItem
                href="/a/registries"
                text="Registries"
                icon={FileBox}
            />
            <SimpleSidebarItem
                href="/a/albums"
                text="Albums"
                icon={Library}
            />
        </SimpleSidebarGroup>
    );
}
