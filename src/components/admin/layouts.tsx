import { m } from "@shared/paraglide/messages";
import { IconCode, IconFiles, IconHome, IconLibraryPhoto, IconPhoto, IconUser, IconUsers } from "@tabler/icons-react";
import { SidebarLayout } from "../layout/sidebar";
import type { SidebarEntryGroup } from "../layout/sidebar";

const groups: SidebarEntryGroup[] = [
    {
        title: m.dashboard_general,
        entries: [
            { text: m.account_overview, icon: IconHome, link: { to: "/admin" }, exact: true },
            { text: m.account_users, icon: IconUsers, link: { to: "/admin/users" } },
            { text: m.account_assets, icon: IconFiles, link: { to: "/admin/assets" } },
        ],
    },
    {
        title: () => "Media",
        entries: [
            {
                text: m.common_portfolio,
                icon: IconPhoto,
                children: [
                    { text: m.account_portfolio_categories, link: { to: "/admin/portfolio/categories" } },
                    { text: m.account_portfolio_groups, link: { to: "/admin/portfolio/groups" } },
                    { text: m.admin_portfolio_media, link: { to: "/admin/portfolio/media" } },
                ],
            },
            { text: m.account_albums, icon: IconLibraryPhoto, link: { to: "/admin/albums" } },
        ],
    },
    {
        title: () => "Software",
        entries: [
            // TODO: demo, every client's software projects, the other side of "Proiecte" in the account
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
