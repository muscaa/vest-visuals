import { m } from "@shared/paraglide/messages";
import { Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { IconLogout, IconSelector, IconSettings, IconWorld } from "@tabler/icons-react";
import { LanguageToggle } from "../language-toggle";
import { LogoSmall } from "../logo";
import { ThemeToggle } from "../theme";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
    useSidebar,
} from "../ui/sidebar";
import type { Icon } from "@tabler/icons-react";
import type { LinkOptions } from "@tanstack/react-router";

// text is stored as message functions and only called while rendering, so it's in the visitor's locale
export interface SidebarEntry {
    text: () => string;
    icon: Icon;
    /** missing while the page doesn't exist yet */
    link?: LinkOptions;
}

export interface SidebarEntryGroup {
    title: () => string;
    entries: SidebarEntry[];
}

export interface SidebarLayoutProps {
    /** which area this is, under the logo: "Contul meu", "Administrare" */
    title: () => string;
    /** the area's home page, where the logo leads */
    home: LinkOptions;
    groups: SidebarEntryGroup[];
    /** an entry in the user menu leading to the other area */
    switchTo?: SidebarEntry & {
        /** only shown to admins */
        admin?: boolean;
    };
}

// TODO: the signed in user, once login works
const user = {
    name: "Ion Popescu",
    email: "ion@exemplu.ro",
    image: undefined as string | undefined,
    admin: true,
};

function Entry({ entry }: { entry: SidebarEntry }) {
    const matchRoute = useMatchRoute();
    const EntryIcon = entry.icon;
    const text = entry.text();

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                tooltip={text}
                isActive={entry.link ? Boolean(matchRoute(entry.link)) : false}
                render={entry.link ? <Link {...entry.link} /> : undefined}
            >
                <EntryIcon />
                <span>{text}</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

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

function UserMenu(props: Pick<SidebarLayoutProps, "switchTo">) {
    const { isMobile } = useSidebar();
    const switchTo = props.switchTo && (!props.switchTo.admin || user.admin) ? props.switchTo : undefined;
    const SwitchIcon = switchTo?.icon;

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
                        {/* TODO: link the account settings once the page exists */}
                        <DropdownMenuItem>
                            <IconSettings />
                            {m.account_settings()}
                        </DropdownMenuItem>
                        {
                            switchTo && SwitchIcon && (
                                <DropdownMenuItem render={switchTo.link ? <Link {...switchTo.link} /> : undefined}>
                                    <SwitchIcon />
                                    {switchTo.text()}
                                </DropdownMenuItem>
                            )
                        }
                        <DropdownMenuItem render={<Link to="/home" />}>
                            <IconWorld />
                            {m.account_back_to_site()}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
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

/** The signed in areas (account, admin): a sidebar with grouped entries and the user menu, a slim top bar and the page. */
export function SidebarLayout(props: SidebarLayoutProps) {
    const title = props.title();

    return (
        <SidebarProvider className="h-full min-h-0">
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" tooltip={title} render={<Link {...props.home} />}>
                                <LogoSmall className="size-8 shrink-0" />
                                <div className="flex flex-col min-w-0">
                                    <span className="truncate font-medium">Vest Visuals</span>
                                    <span className="truncate text-xs text-muted-foreground">{title}</span>
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    {
                        props.groups.map((group) => (
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
                    <UserMenu switchTo={props.switchTo} />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <SidebarInset className="overflow-hidden">
                <header className="flex justify-between items-center gap-2 h-16 shrink-0 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex items-center gap-1">
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                </header>
                <div className="flex flex-col grow overflow-y-auto">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
