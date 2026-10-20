import { m } from "@shared/paraglide/messages";
import { IconCode, IconFiles, IconHome, IconLibraryPhoto, IconPhoto, IconUser, IconUsers } from "@tabler/icons-react";
import { SidebarLayout } from "../layout/sidebar";
import type { SidebarEntryGroup } from "../layout/sidebar";

// TODO: link the entries once their pages exist
const groups: SidebarEntryGroup[] = [
    {
        title: m.dashboard_general,
        entries: [
            { text: m.account_overview, icon: IconHome, link: { to: "/admin" } },
            { text: m.account_users, icon: IconUsers },
            { text: m.account_assets, icon: IconFiles },
        ],
    },
    {
        title: () => "Media",
        entries: [
            { text: m.common_portfolio, icon: IconPhoto },
            { text: m.account_albums, icon: IconLibraryPhoto },
        ],
    },
    {
        title: () => "Software",
        entries: [
            // demo: every client's software projects, the other side of "Proiecte" in the account
            { text: m.dashboard_projects, icon: IconCode },
        ],
    },
];

/** The admin site, for admins only. */
export function AdminSidebarLayout() {
    return (
        <SidebarLayout
            title={m.admin_title}
            home={{ to: "/admin" }}
            groups={groups}
            switchTo={{ text: m.dashboard_switch_account, icon: IconUser, link: { to: "/account" } }}
        />
    );
}
