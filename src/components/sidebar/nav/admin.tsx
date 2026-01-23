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
    FileSymlink,
    Image,
    FileBox,
    Library,
} from "lucide-react";
import {
    A_ASSETS,
    A_CLI,
    A_PORTFOLIO_CATEGORIES,
    A_PORTFOLIO_GROUPS,
    A_PORTFOLIO_MEDIA,
    A_REGISTRIES,
    A_USERS,
} from "@shared/paths";

interface SidebarNavAdminProps {

}

export function SidebarNavAdmin(props: SidebarNavAdminProps) {
    const { openMinio } = useAdmin();

    return (
        <SimpleSidebarGroup title="Admin">
            <SimpleSidebarItem
                href={A_CLI}
                text="CLI"
                icon={Terminal}
            />
            <SimpleSidebarItem
                onClick={openMinio.mutate}
                text="Minio"
                icon={Box}
            />
            <SimpleSidebarItem
                href={A_USERS}
                text="Users"
                icon={Users}
            />
            <SimpleSidebarItem
                href={A_ASSETS}
                text="Assets"
                icon={FileSymlink}
            />
            <SimpleSidebarMenu
                title="Portfolio"
                icon={Image}
            >
                <SimpleSidebarMenuItem
                    href={A_PORTFOLIO_CATEGORIES}
                    text="Categories"
                />
                <SimpleSidebarMenuItem
                    href={A_PORTFOLIO_GROUPS}
                    text="Groups"
                />
                <SimpleSidebarMenuItem
                    href={A_PORTFOLIO_MEDIA}
                    text="Media"
                />
            </SimpleSidebarMenu>
            <SimpleSidebarItem
                href={A_REGISTRIES}
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
