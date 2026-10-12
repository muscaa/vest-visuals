import { IconChevronRight, IconMenu2, IconX } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { createContext, useContext, useState } from "react";
import { cn } from "@shared/shadcn/utils";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "./ui/navigation-menu";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";
import type { LinkOptions } from "@tanstack/react-router";

const mobileEntry =
    "flex justify-between items-center w-full h-12 px-4 rounded-2xl text-md-3 transition-all outline-none hover:bg-muted focus-visible:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30";

//
// mobile
//
function MobileNavEntry({ text, ...props }: NavEntryProps) {
    const { close } = useNav();

    return (
        <Link {...props} onClick={close} className={mobileEntry}>
            {text}
        </Link>
    );
}

function MobileNavMenu(props: NavMenuProps) {
    const [open, setOpen] = useState(false);

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger
                className={cn(mobileEntry, "group/nav-menu data-panel-open:bg-muted/60")}
            >
                {props.text}
                <IconChevronRight className="size-5 text-muted-foreground transition-transform duration-200 group-data-panel-open/nav-menu:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-1 ml-4 my-1 pl-3 border-l">
                {props.children}
            </CollapsibleContent>
        </Collapsible>
    );
}

function MobileNavMenuEntry({ text, ...props }: NavMenuEntryProps) {
    const { close } = useNav();

    return (
        <Link
            {...props}
            onClick={close}
            className={cn(mobileEntry, "h-11 text-md-4 text-muted-foreground hover:text-foreground")}
        >
            {text}
        </Link>
    );
}

function MobileNav(props: NavProps & { className?: string }) {
    const [open, setOpen] = useState(false);

    return (
        <NavContext value={{ mobile: true, close: () => setOpen(false) }}>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger
                    render={<Button variant="ghost" size="icon-lg" className={props.className} />}
                    aria-label={open ? "Închide meniul" : "Deschide meniul"}
                >
                    {open ? <IconX className="size-6" /> : <IconMenu2 className="size-6" />}
                </SheetTrigger>
                <SheetContent
                    side="top"
                    showCloseButton={false}
                    className="data-[side=top]:top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto rounded-b-3xl"
                >
                    <div className="flex flex-col gap-1 px-2 py-4">
                        {props.children}
                    </div>
                </SheetContent>
            </Sheet>
        </NavContext>
    );
}

//
// desktop
//
function DesktopNavEntry({ text, ...props }: NavEntryProps) {
    return (
        <NavigationMenuItem>
            <NavigationMenuLink
                base="trigger"
                render={<Link {...props} />}
            >
                {text}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
}

function DesktopNavMenu(props: NavMenuProps) {
    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger>
                {props.text}
            </NavigationMenuTrigger>
            <NavigationMenuContent>{props.children}</NavigationMenuContent>
        </NavigationMenuItem>
    );
}

function DesktopNavMenuEntry({ text, ...props }: NavMenuEntryProps) {
    return (
        <NavigationMenuLink render={<Link {...props} />}>
            {text}
        </NavigationMenuLink>
    );
}

function DesktopNav(props: NavProps & { className?: string }) {
    return (
        <NavContext value={{ mobile: false, close: () => {} }}>
            <NavigationMenu className={props.className}>
                <NavigationMenuList>{props.children}</NavigationMenuList>
            </NavigationMenu>
        </NavContext>
    );
}

//
// auto
//
interface NavContext {
    mobile: boolean;
    /** closes the mobile menu, does nothing on desktop */
    close: () => void;
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

    return mobile ? <MobileNavEntry {...props} /> : <DesktopNavEntry {...props} />;
}

export type NavMenuProps = {
    text: string;
    children?: React.ReactNode;
};

export function NavMenu(props: NavMenuProps) {
    const { mobile } = useNav();

    return mobile ? <MobileNavMenu {...props} /> : <DesktopNavMenu {...props} />;
}

export type NavMenuEntryProps = LinkOptions & {
    text: string;
};

export function NavMenuEntry(props: NavMenuEntryProps) {
    const { mobile } = useNav();

    return mobile ? <MobileNavMenuEntry {...props} /> : <DesktopNavMenuEntry {...props} />;
}

export type NavActionsProps = {
    children?: React.ReactNode;
};

/** Small controls like the theme and language toggles: inline on desktop, their own row at the bottom of the mobile menu. */
export function NavActions(props: NavActionsProps) {
    const { mobile } = useNav();

    return mobile ? (
        <div className="flex items-center gap-2 mt-2 pt-4 px-2 border-t">
            {props.children}
        </div>
    ) : (
        <NavigationMenuItem className="flex items-center gap-1 ml-2">
            {props.children}
        </NavigationMenuItem>
    );
}

export type NavProps = {
    children?: React.ReactNode;
};

/** Renders both variants and lets CSS pick one, so the right one is there from the first paint. */
export function Nav(props: NavProps) {
    return (
        <>
            <DesktopNav className="hidden md:flex">{props.children}</DesktopNav>
            <MobileNav className="md:hidden">{props.children}</MobileNav>
        </>
    );
}
