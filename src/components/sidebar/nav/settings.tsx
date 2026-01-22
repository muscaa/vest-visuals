"use client";

import {
    SimpleSidebarGroup,
    SimpleSidebarItem,
} from "../simple";
import {
    User,
    Settings2,
} from "lucide-react";
import {
    U_ACCOUNT,
    U_PREFERENCES,
} from "@shared/paths";

interface SidebarNavSettingsProps {

}

export function SidebarNavSettings(props: SidebarNavSettingsProps) {
    return (
        <SimpleSidebarGroup title="Settings">
            <SimpleSidebarItem
                href={U_ACCOUNT}
                text="Account"
                icon={User}
            />
            <SimpleSidebarItem
                href={U_PREFERENCES}
                text="Preferences"
                icon={Settings2}
            />
        </SimpleSidebarGroup>
    );
}
