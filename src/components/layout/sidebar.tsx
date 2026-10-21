import { cn } from "@shared/shadcn/utils";
import { m } from "@shared/paraglide/messages";
import { isAdmin } from "@shared/auth";
import { authClient, usePublicUrl, useUser } from "@client/auth";
import { Link, Outlet, useMatchRoute, useMatches } from "@tanstack/react-router";
import { Fragment, useState  } from "react";
import { IconChevronRight, IconLogout, IconSelector, IconSettings, IconWorld } from "@tabler/icons-react";
import { LanguageToggle } from "../language-toggle";
import { LogoSmall } from "../logo";
import { ThemeToggle } from "../theme";
import { TextH1, TextP } from "../typography";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
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
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
    useSidebar,
} from "../ui/sidebar";
import { Separator } from "../ui/separator";
import type { Icon } from "@tabler/icons-react";
import type { LinkOptions } from "@tanstack/react-router";

export interface DashboardCrumb {
    label: string;
    /** missing for the current page and for sections without a page of their own, like "Portofoliu" */
    link?: LinkOptions;
}

declare module "@tanstack/react-router" {
    interface StaticDataRouteOption {
        /**
         * The page's place in the account or admin area, after the area's home, shown in the top bar.
         * Called while rendering, with the route's loader data for names like a category's tag.
         */
        breadcrumbs?: (loaderData: any) => DashboardCrumb[];
    }
}

// text is stored as message functions and only called while rendering, so it's in the visitor's locale
export interface SidebarSubEntry {
    text: () => string;
    /** missing while the page doesn't exist yet */
    link?: LinkOptions;
    /** only active on the link itself, not its sub pages; for the area's home */
    exact?: boolean;
}

export interface SidebarEntry extends SidebarSubEntry {
    icon: Icon;
    /** shown as a collapsible menu, open while one of its pages is */
    children?: SidebarSubEntry[];
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

/** Whether an entry is the current page, or one of its sub pages (an album is under "Albums"). */
function useIsActive() {
    const matchRoute = useMatchRoute();
    return (entry: SidebarSubEntry) => (entry.link ? Boolean(matchRoute({ ...entry.link, fuzzy: !entry.exact })) : false);
}

function Entry({ entry }: { entry: SidebarEntry }) {
    const isActive = useIsActive();
    const childActive = entry.children?.some(isActive) ?? false;
    // controlled, so it can open when navigating to one of its pages
    const [open, setOpen] = useState(childActive);
    const [wasActive, setWasActive] = useState(childActive);
    if (childActive !== wasActive) {
        setWasActive(childActive);
        if (childActive) setOpen(true);
    }
    const EntryIcon = entry.icon;
    const text = entry.text();

    if (entry.children) {
        return (
            <Collapsible open={open} onOpenChange={setOpen} render={<SidebarMenuItem />}>
                <CollapsibleTrigger render={<SidebarMenuButton tooltip={text} className="group/sidebar-menu" />}>
                    <EntryIcon />
                    <span>{text}</span>
                    <IconChevronRight className="ml-auto transition-transform duration-200 group-data-panel-open/sidebar-menu:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {
                            entry.children.map((child) => (
                                <SidebarMenuSubItem key={child.text()}>
                                    <SidebarMenuSubButton
                                        isActive={isActive(child)}
                                        render={child.link ? <Link {...child.link} /> : <button type="button" className="w-full" />}
                                    >
                                        <span>{child.text()}</span>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
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
                isActive={isActive(entry)}
                render={entry.link ? <Link {...entry.link} /> : undefined}
            >
                <EntryIcon />
                <span>{text}</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

function UserDetails() {
    const user = useUser();

    return (
        <>
            <Avatar>
                <AvatarImage src={user.image ?? undefined} alt={user.name} />
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
    const user = useUser();
    const publicUrl = usePublicUrl();
    const switchTo = props.switchTo && (!props.switchTo.admin || isAdmin(user)) ? props.switchTo : undefined;

    const signOut = async () => {
        await authClient.signOut();
        // a full load, so nothing of the account stays in memory
        window.location.assign(publicUrl({ to: "/account/login" }));
    };
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
                        <DropdownMenuItem render={<Link to="/account/settings" />}>
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
                        <DropdownMenuItem variant="destructive" onClick={signOut}>
                            <IconLogout />
                            {m.account_logout()}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

/** The current page's breadcrumbs, from its route's `staticData`. On small screens only the last two show. */
function DashboardBreadcrumbs(props: Pick<SidebarLayoutProps, "title" | "home">) {
    const matches = useMatches();
    const match = [...matches].reverse().find((value) => value.staticData.breadcrumbs);
    const crumbs: DashboardCrumb[] = [
        { label: props.title(), link: props.home },
        ...(match?.staticData.breadcrumbs?.(match.loaderData) ?? []),
    ];

    return (
        <Breadcrumb className="min-w-0">
            <BreadcrumbList>
                {
                    crumbs.map((crumb, index) => {
                        const last = index === crumbs.length - 1;
                        const hidden = index < crumbs.length - 2 && "hidden md:inline-flex";

                        return (
                            <Fragment key={index}>
                                {index > 0 && <BreadcrumbSeparator className={cn(index < crumbs.length - 1 && "hidden md:inline-flex")} />}
                                <BreadcrumbItem className={cn(hidden, "min-w-0")}>
                                    {
                                        last
                                            ? <BreadcrumbPage className="truncate">{crumb.label}</BreadcrumbPage>
                                            : crumb.link
                                                ? <BreadcrumbLink render={<Link {...crumb.link} />}>{crumb.label}</BreadcrumbLink>
                                                : <span>{crumb.label}</span>
                                    }
                                </BreadcrumbItem>
                            </Fragment>
                        );
                    })
                }
            </BreadcrumbList>
        </Breadcrumb>
    );
}

/**
 * Whether the sidebar is open, kept across page groups: each group has its own layout route, so the sidebar remounts
 * when moving between them. Only for the browser session; a fresh load starts open.
 */
let sidebarOpen = true;

/** The signed in areas (account, admin): a sidebar with grouped entries and the user menu, a slim top bar and the page. */
export function SidebarLayout(props: SidebarLayoutProps) {
    const title = props.title();
    const [open, setOpen] = useState(sidebarOpen);

    const handleOpenChange = (value: boolean) => {
        sidebarOpen = value;
        setOpen(value);
    };

    return (
        <SidebarProvider open={open} onOpenChange={handleOpenChange} className="h-full min-h-0">
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
                <header className="flex items-center gap-2 h-16 shrink-0 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 data-vertical:h-4 data-vertical:self-center" />
                    <DashboardBreadcrumbs title={props.title} home={props.home} />
                    <div className="flex items-center gap-1 ml-auto">
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

export interface DashboardPageProps {
    title: string;
    description?: string;
    /** e.g. an "Add" button, next to the title */
    action?: React.ReactNode;
    /** a centered, readable column, for forms like settings; lists and tables use the full width */
    narrow?: boolean;
    children?: React.ReactNode;
}

/** A page in the account or admin area: title, short description, an optional action and the content. */
export function DashboardPage(props: DashboardPageProps) {
    return (
        <main className={cn("flex flex-col gap-8 w-full px-6 pb-10 md:px-10", props.narrow && "max-w-4xl mx-auto")}>
            <div className="flex flex-wrap justify-between items-end gap-4">
                <div className="flex flex-col gap-2">
                    <TextH1 size="md-1">{props.title}</TextH1>
                    {
                        props.description && (
                            <TextP variant="muted" size="md-4" className="max-w-[60ch]">
                                {props.description}
                            </TextP>
                        )
                    }
                </div>
                {props.action}
            </div>
            {props.children}
        </main>
    );
}
