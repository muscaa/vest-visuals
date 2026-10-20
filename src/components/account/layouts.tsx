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

// TODO: link the entries once their pages exist
const groups: SidebarEntryGroup[] = [
    {
        title: m.dashboard_general,
        entries: [
            { text: m.account_overview, icon: IconHome, link: { to: "/account" } },
        ],
    },
    {
        title: () => "Media",
        entries: [
            // the client's digital albums
            { text: m.account_albums, icon: IconLibraryPhoto },
        ],
    },
    {
        title: () => "Software",
        entries: [
            // demo: the client's software projects and how they're going
            { text: m.dashboard_projects, icon: IconCode },
        ],
    },
];

/** The signed in part of the account site. */
export function AccountSidebarLayout() {
    return (
        <SidebarLayout
            title={m.nav_account}
            home={{ to: "/account" }}
            groups={groups}
            switchTo={{ text: m.dashboard_switch_admin, icon: IconShield, link: { to: "/admin" }, admin: true }}
        />
    );
}
