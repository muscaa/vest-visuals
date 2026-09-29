import { useIsMobile } from "@client/shadcn/hooks/use-mobile";
import { IconChevronDown, IconChevronRight, IconMenu2 } from "@tabler/icons-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Link, LinkOptions } from "@tanstack/react-router";
import { createContext, useContext, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

//
// mobile
//
function MobileNavEntry({ text, ...props }: NavEntryProps) {
    return (
        <Link
            {...props}
            className="flex justify-between items-center h-9 rounded-3xl px-4.5 py-2.5 text-md-3 transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50"
        >
            {text}
        </Link>
    );
}

function MobileNavMenu(props: NavMenuProps) {
    const [open, setOpen] = useState(false);

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger
                data-open={open}
                className="group group/collapsible-trigger flex justify-between items-center w-full h-9 rounded-3xl px-4.5 py-2.5 text-md-3 transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted"
            >
                {props.text}
                <IconChevronRight className="transition duration-300 group-data-open/collapsible-trigger:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-1 mt-1">
                {props.children}
            </CollapsibleContent>
        </Collapsible>
    );
}

function MobileNavMenuEntry({ text, ...props }: NavMenuEntryProps) {
    return (
        <Link
            {...props}
            className="flex justify-between items-center h-9 rounded-3xl ml-4 px-4.5 py-2.5 text-md-3 transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50"
        >
            {text}
        </Link>
    );
}

function MobileNav(props: NavProps) { // TODO replace with right side sidebar
    return (
        <Sheet>
            <SheetTrigger className="flex justify-center items-center size-8 mr-2">
                <IconMenu2 />
            </SheetTrigger>
            <SheetContent side="right" className="max-h-full overflow-y-auto">
                <div className="flex flex-col mt-20 m-2 gap-1">
                    {props.children}
                </div>
            </SheetContent>
        </Sheet>
    );
}

//
// desktop
//
function DesktopNavEntry({ text, ...props }: NavEntryProps) {
    return (
        <NavigationMenuItem>
            <NavigationMenuLink
                render={(
                    <Link {...props} />
                )}
                className="uppercase"
            >
                {text}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
}

function DesktopNavMenu(props: NavMenuProps) {
    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger className="uppercase">
                {props.text}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
                {props.children}
            </NavigationMenuContent>
        </NavigationMenuItem>
    );
}

function DesktopNavMenuEntry({ text, ...props }: NavMenuEntryProps) {
    return (
        <NavigationMenuLink
            render={(
                <Link {...props} />
            )}
            className="uppercase"
        >
            {text}
        </NavigationMenuLink>
    );
}

function DesktopNav(props: NavProps) {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {props.children}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

//
// auto
//
interface NavContext {
    mobile: boolean;
}

const NavContext = createContext<NavContext | null>(null);

export function useNav() {
    const context = useContext(NavContext);

    if (!context) {
        throw new Error("useNav must be used within a <Nav />");
    }

    return context;
}

export type NavEntryProps = LinkOptions & {
    text: string;
};

export function NavEntry(props: NavEntryProps) {
    const { mobile } = useNav();

    return (
        mobile && (
            <MobileNavEntry {...props} />
        ) || (
            <DesktopNavEntry {...props} />
        )
    );
}

export type NavMenuProps = {
    text: string;
    children?: React.ReactNode;
};

export function NavMenu(props: NavMenuProps) {
    const { mobile } = useNav();

    return (
        mobile && (
            <MobileNavMenu {...props} />
        ) || (
            <DesktopNavMenu {...props} />
        )
    );
}

export type NavMenuEntryProps = LinkOptions & {
    text: string;
};

export function NavMenuEntry(props: NavMenuEntryProps) {
    const { mobile } = useNav();

    return (
        mobile && (
            <MobileNavMenuEntry {...props} />
        ) || (
            <DesktopNavMenuEntry {...props} />
        )
    );
}

export type NavProps = {
    children?: React.ReactNode;
};

export function Nav(props: NavProps) {
    const { isMobileState } = useIsMobile();

    if (isMobileState === undefined) {
        return null;
    }

    return (
        <NavContext.Provider
            value={{
                mobile: isMobileState,
            }}
        >
            {
                isMobileState && (
                    <MobileNav {...props} />
                ) || (
                    <DesktopNav {...props} />
                )
            }
        </NavContext.Provider>
    );
}
