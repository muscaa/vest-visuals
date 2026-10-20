import { m } from "@shared/paraglide/messages";
import { Link, useMatchRoute } from "@tanstack/react-router";
import {
    IconAdjustments,
    IconArchive,
    IconBox,
    IconChevronRight,
    IconFileSymlink,
    IconHome,
    IconLibraryPhoto,
    IconLogout,
    IconPhoto,
    IconSelector,
    IconTerminal2,
    IconUser,
    IconUsers,
    IconWorld,
} from "@tabler/icons-react";
import { LogoSmall } from "../logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    useSidebar,
} from "../ui/sidebar";
import type { Icon } from "@tabler/icons-react";
import type { LinkOptions } from "@tanstack/react-router";

//
// entries
//
// text is stored as message functions and only called while rendering, so it's in the visitor's locale
interface SidebarSubEntry {
    text: () => string;
    /** missing while the page doesn't exist yet */
    link?: LinkOptions;
}

interface SidebarEntry extends SidebarSubEntry {
    icon: Icon;
    /** shown as a collapsible menu */
    children?: SidebarSubEntry[];
}

interface SidebarEntryGroup {
    title: () => string;
    entries: SidebarEntry[];
    /** only for admins */
    admin?: boolean;
}

// TODO: link the entries once their pages exist
const groups: SidebarEntryGroup[] = [
    {
        title: m.nav_account,
        entries: [
            { text: m.account_overview, icon: IconHome, link: { to: "/account" } },
        ],
    },
    {
        title: m.account_settings,
        entries: [
            { text: m.account_profile, icon: IconUser },
            { text: m.account_preferences, icon: IconAdjustments },
        ],
    },
    {
        title: m.account_admin,
        admin: true,
        entries: [
            { text: () => "CLI", icon: IconTerminal2 },
            { text: () => "Minio", icon: IconBox },
            { text: m.account_users, icon: IconUsers },
            { text: m.account_assets, icon: IconFileSymlink },
            {
                text: m.common_portfolio,
                icon: IconPhoto,
                children: [
                    { text: m.account_portfolio_categories },
                    { text: m.account_portfolio_groups },
                    { text: () => "Media" },
                ],
            },
            { text: m.account_registries, icon: IconArchive },
            { text: m.account_albums, icon: IconLibraryPhoto },
        ],
    },
];

// TODO: the signed in user, once login works
const user = {
    name: "Ion Popescu",
    email: "ion@exemplu.ro",
    image: undefined as string | undefined,
    admin: true,
};

function useIsActive(link?: LinkOptions) {
    const matchRoute = useMatchRoute();
    return link ? Boolean(matchRoute(link)) : false;
}

function Entry({ entry }: { entry: SidebarEntry }) {
    const EntryIcon = entry.icon;
    const active = useIsActive(entry.link);
    const text = entry.text();

    if (entry.children) {
        return (
            <Collapsible render={<SidebarMenuItem />}>
                <CollapsibleTrigger
                    render={<SidebarMenuButton tooltip={text} className="group/sidebar-menu" />}
                >
                    <EntryIcon />
                    <span>{text}</span>
                    <IconChevronRight className="ml-auto transition-transform duration-200 group-data-panel-open/sidebar-menu:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {
                            entry.children.map((child) => (
                                <SubEntry key={child.text()} entry={child} />
                            ))
                        }
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        );
    }

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                tooltip={text}
                isActive={active}
                render={entry.link ? <Link {...entry.link} /> : undefined}
            >
                <EntryIcon />
                <span>{text}</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

function SubEntry({ entry }: { entry: SidebarSubEntry }) {
    const active = useIsActive(entry.link);

    return (
        <SidebarMenuSubItem>
            <SidebarMenuSubButton
                isActive={active}
                render={entry.link ? <Link {...entry.link} /> : <button type="button" className="w-full" />}
            >
                <span>{entry.text()}</span>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    );
}

//
// user
//
function UserDetails() {
    return (
        <>
            <Avatar>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 text-left">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
        </>
    );
}

function UserMenu() {
    const { isMobile } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={<SidebarMenuButton size="lg" aria-label={m.account_user_menu()} />}
                    >
                        <UserDetails />
                        <IconSelector className="ml-auto size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                        className="min-w-56"
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="flex items-center gap-2 p-1.5 text-foreground">
                                <UserDetails />
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem render={<Link to="/home" />}>
                            <IconWorld />
                            {m.account_back_to_site()}
                        </DropdownMenuItem>
                        {/* TODO: sign out once login works */}
                        <DropdownMenuItem variant="destructive">
                            <IconLogout />
                            {m.account_logout()}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

//
// sidebar
//
/** The account dashboard's sidebar: navigation groups, admin tools for admins and the user menu. */
export function AccountSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" tooltip="Vest Visuals" render={<Link to="/account" />}>
                            <LogoSmall className="size-8 shrink-0" />
                            <span className="truncate font-medium">Vest Visuals</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {
                    groups
                        .filter((group) => !group.admin || user.admin)
                        .map((group) => (
                            <SidebarGroup key={group.title()}>
                                <SidebarGroupLabel>{group.title()}</SidebarGroupLabel>
                                <SidebarMenu>
                                    {
                                        group.entries.map((entry) => (
                                            <Entry key={entry.text()} entry={entry} />
                                        ))
                                    }
                                </SidebarMenu>
                            </SidebarGroup>
                        ))
                }
            </SidebarContent>
            <SidebarFooter>
                <UserMenu />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
