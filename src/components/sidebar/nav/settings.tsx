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
                href="/a/account"
                text="Account"
                icon={User}
            />
            <SimpleSidebarItem
                href="/a/preferences"
                text="Preferences"
                icon={Settings2}
            />
        </SimpleSidebarGroup>
    );
}
