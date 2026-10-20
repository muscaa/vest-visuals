import { m } from "@shared/paraglide/messages";
import { Outlet } from "@tanstack/react-router";
import { IconCode, IconHome, IconLibraryPhoto, IconShield } from "@tabler/icons-react";
import { ScreenLayout } from "../layout/screen";
import { SidebarLayout } from "../layout/sidebar";
import type { SidebarEntryGroup } from "../layout/sidebar";

export function AccountScreenLayout() {
    return (
        <ScreenLayout>
            <Outlet />
        </ScreenLayout>
    );
}

const groups: SidebarEntryGroup[] = [
    {
        title: m.dashboard_general,
        entries: [
            { text: m.account_overview, icon: IconHome, link: { to: "/account" }, exact: true },
        ],
    },
    {
        title: () => "Media",
        entries: [
            // the client's digital albums
            { text: m.account_albums, icon: IconLibraryPhoto, link: { to: "/account/albums" } },
        ],
    },
    {
        title: () => "Software",
        entries: [
            // TODO: demo, the client's software projects and how they're going
            { text: m.dashboard_projects, icon: IconCode },
        ],
    },
];

/** The signed in part of the account site. */
export function AccountSidebarLayout() {
    return (
        <SidebarLayout
            title={m.account_area}
            home={{ to: "/account" }}
            groups={groups}
            switchTo={{ text: m.dashboard_switch_admin, icon: IconShield, link: { to: "/admin" }, admin: true }}
        />
    );
}
