"use client";

import { Single } from "@type/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ChevronRightIcon, Dot, Menu } from "lucide-react";
import { Link, Pathname } from "@shared/i18n";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface NavigationBase {
    text: string;
}

interface NavigationTypes {
    entries: (NavigationBase & Single<Omit<NavigationTypes, "entries">>)[];
    to: Pathname;
}

export type NavigationEntry = NavigationBase & Single<NavigationTypes>;

export interface NavigationProps {
    entries: NavigationEntry[];
    start?: React.ReactNode;
    end?: React.ReactNode;
}

export function Navigation(props: NavigationProps) {
    const isMobile = useIsMobile();

    if (isMobile === null) {
        return null;
    }

    return (
        isMobile && (
            <Sheet>
                <SheetTrigger className="flex justify-center items-center size-8 mr-2">
                    <Menu />
                </SheetTrigger>
                <SheetContent side="top" className="max-h-full overflow-y-auto">
                    <div className="flex flex-col gap-1 my-16 mx-8">
                        {
                            props.start && (
                                <div className="flex">
                                    {props.start}
                                </div>
                            )
                        }
                        {
                            props.entries.map((entry, index) => (
                                entry.entries && (
                                    <Collapsible key={`${entry.text}-${index}`} className="group">
                                        <CollapsibleTrigger
                                            render={
                                                <Button variant="navbar">
                                                    <ChevronRightIcon className="transition-transform group-data-open:rotate-90" />
                                                    {entry.text}
                                                </Button>
                                            }
                                        />
                                        <CollapsibleContent className="flex mt-1 ml-7">
                                            <Separator orientation="vertical" />
                                            <div className="flex flex-col gap-1">
                                                {
                                                    entry.entries.map((entry, index) => (
                                                        entry.to && (
                                                            <Link key={`${entry.text}-${index}`} href={entry.to}>
                                                                <Button variant="navbar">
                                                                    <Dot />
                                                                    {entry.text}
                                                                </Button>
                                                            </Link>
                                                        )
                                                    ))
                                                }
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ) || entry.to && (
                                    <Link key={`${entry.text}-${index}`} href={entry.to}>
                                        <Button variant="navbar">
                                            <Dot />
                                            {entry.text}
                                        </Button>
                                    </Link>
                                )
                            ))
                        }
                        {
                            props.end && (
                                <div className="flex ml-9">
                                    {props.end}
                                </div>
                            )
                        }
                    </div>
                </SheetContent>
            </Sheet>
        ) || (
            <NavigationMenu>
                {
                    props.start && (
                        <div className="flex">
                            {props.start}
                        </div>
                    )
                }
                <NavigationMenuList>
                    {
                        props.entries.map((entry, index) => (
                            <NavigationMenuItem key={`${entry.text}-${index}`}>
                                {
                                    entry.entries && (
                                        <>
                                            <NavigationMenuTrigger>{entry.text}</NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                {
                                                    entry.entries.map((entry, index) => (
                                                        entry.to && (
                                                            <NavigationMenuLink
                                                                key={`${entry.text}-${index}`}
                                                                render={<Link href={entry.to} />}
                                                            >
                                                                {entry.text}
                                                            </NavigationMenuLink>
                                                        )
                                                    ))
                                                }
                                            </NavigationMenuContent>
                                        </>
                                    ) || entry.to && (
                                        <NavigationMenuLink
                                            render={<Link href={entry.to} />}
                                            base="trigger"
                                            variant="ghost"
                                        >
                                            {entry.text}
                                        </NavigationMenuLink>
                                    )
                                }
                            </NavigationMenuItem>
                        ))
                    }
                </NavigationMenuList>
                {
                    props.end && (
                        <div className="flex">
                            {props.end}
                        </div>
                    )
                }
            </NavigationMenu>
        )
    );
}
