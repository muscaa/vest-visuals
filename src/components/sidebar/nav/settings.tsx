"use client";

import {
    SimpleSidebarGroup,
    SimpleSidebarItem,
} from "../simple";
import {
    User,
    Settings2,
} from "lucide-react";

interface SidebarNavSettingsProps {

}

export function SidebarNavSettings(props: SidebarNavSettingsProps) {
    return (
        <SimpleSidebarGroup title="Settings">
            <SimpleSidebarItem
                href="/u/account"
                text="Account"
                icon={User}
            />
            <SimpleSidebarItem
                href="/u/preferences"
                text="Preferences"
                icon={Settings2}
            />
        </SimpleSidebarGroup>
    );
}
