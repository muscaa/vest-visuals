"use client";

import Image from "next/image";
import logo from ":/logos/vest-visuals-slim.svg";
import {
    Button,
    buttonVariants,
} from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useState } from "react";
import {
    Menu,
    X
} from "lucide-react";
import { ButtonLink } from "@/components/snippets";
import {
    Link,
    HOME,
    CONTACT,
    SERVICES_WEDDING,
    SERVICES_CHRISTENING,
    SERVICES_18TH_BIRTHDAY,
    SERVICES_OUTDOOR,
    SERVICES_REAL_ESTATE,
    SERVICES_AUTOMOTIVE,
    SERVICES_MARKETING,
} from "@shared/i18n";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@shared/shadcn/lib/utils";

type NavEndpoint = {
    title: string;
    href: string;
};

type NavLink = {
    type: "list";
    title: string;
    endpoints: NavEndpoint[];
} | ({
    type: "endpoint";
} & NavEndpoint);

const navLinks: NavLink[] = [
    {
        type: "endpoint",
        title: "ACASA",
        href: HOME(),
    },
    {
        type: "list",
        title: "EVENIMENTE",
        endpoints: [
            {
                title: "NUNTA",
                href: SERVICES_WEDDING(),
            },
            {
                title: "BOTEZ",
                href: SERVICES_CHRISTENING(),
            },
            // {
            //     title: "ANIVERSARE",
            //     href: CONTACT(),
            // },
            {
                title: "MAJORAT",
                href: SERVICES_18TH_BIRTHDAY(),
            },
            // {
            //     title: "BUSINESS / CORPORATE",
            //     href: CONTACT(),
            // },
        ],
    },
    {
        type: "list",
        title: "PORTRETE",
        endpoints: [
            // {
            //     title: "PORTRETE OFICIALE",
            //     href: CONTACT(),
            // },
            // {
            //     title: "ALBUME ABSOLVIRE",
            //     href: CONTACT(),
            // },
            // {
            //     title: "MATERNITATE",
            //     href: CONTACT(),
            // },
            // {
            //     title: "NOU-NASCUTI",
            //     href: CONTACT(),
            // },
            // {
            //     title: "STUDIO",
            //     href: CONTACT(),
            // },
            {
                title: "SEDINTA FOTO", // LUMINA NATURALA (OUTDOOR)
                href: SERVICES_OUTDOOR(),
            },
        ],
    },
    {
        type: "list",
        title: "COMERCIAL",
        endpoints: [
            {
                title: "IMOBILIARE (REAL ESTATE)",
                href: SERVICES_REAL_ESTATE(),
            },
            {
                title: "AUTOMOTIVE",
                href: SERVICES_AUTOMOTIVE(),
            },
            // {
            //     title: "PRODUSE E-COMMERCE",
            //     href: CONTACT(),
            // },
            {
                title: "PROMOVARE FIRME (MARKETING)",
                href: SERVICES_MARKETING(),
            },
        ],
    },
    // {
    //     type: "endpoint",
    //     title: "PORTOFOLIU",
    //     href: PORTFOLIO(),
    // },
    {
        type: "endpoint",
        title: "CONTACT",
        href: CONTACT(),
    },
];

function WideMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {
                    navLinks.map((link, index) => (
                        <NavigationMenuItem key={index}>
                            {
                                link.type === "list" && (
                                    <>
                                        <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid">
                                                {
                                                    link.endpoints.map((endpoint, index) => (
                                                        <li key={index}>
                                                            <NavigationMenuLink render={
                                                                <Link
                                                                    href={endpoint.href}
                                                                    className="flex-row items-center gap-2"
                                                                >
                                                                    {endpoint.title}
                                                                </Link>
                                                            } />
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </NavigationMenuContent>
                                    </>
                                ) || link.type === "endpoint" && (
                                    <NavigationMenuLink base="trigger" variant="ghost" render={
                                        <Link href={link.href}>
                                            {link.title}
                                        </Link>
                                    } />
                                )
                            }
                        </NavigationMenuItem>
                    ))
                }
                <ThemeToggle />
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function MobileMenu() {
    return (
        <>
            {
                navLinks.map((link, index) => (
                    link.type === "list" && (
                        <Collapsible key={index} className="w-full text-center">
                            <CollapsibleTrigger className={cn(buttonVariants({ variant: "navbar", className: "group/collapsible-trigger group data-panel-open:text-primary" }))}>
                                {link.title}
                                <ChevronDownIcon className="transition duration-300 group-data-panel-open/collapsible-trigger:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="border-t border-b border-primary">
                                <ul className="grid">
                                    {
                                        link.endpoints.map((endpoint, index) => (
                                            <li key={index}>
                                                <ButtonLink variant="navbar" href={endpoint.href}>
                                                    {endpoint.title}
                                                </ButtonLink>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </CollapsibleContent>
                        </Collapsible>
                    ) || link.type === "endpoint" && (
                        <ButtonLink key={index} variant="navbar" href={link.href}>
                            {link.title}
                        </ButtonLink>
                    )
                ))
            }
            <ThemeToggle />
        </>
    );
}

export function Navbar() {
    const isMobile = useIsMobile();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="flex flex-col w-full h-16 justify-center items-center bg-card relative shadow-sm z-50">
            <div className="flex size-full max-w-6xl justify-between items-center p-2">
                <Link href={HOME()}>
                    <Image
                        src={logo}
                        alt="Logo"
                        className="size-16"
                    />
                </Link>
                <div className="flex items-center gap-2">
                    {
                        isMobile == true && (
                            <>
                                <Button variant="navbar" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
                                    {
                                        menuOpen && (
                                            <X />
                                        ) || (
                                            <Menu />
                                        )
                                    }
                                </Button>
                            </>
                        ) || isMobile == false && (
                            <WideMenu />
                        )
                    }
                </div>
            </div>
            {
                isMobile == true && menuOpen &&
                <div className="absolute z-50 top-full flex flex-col justify-center items-center gap-2 w-full max-w-6xl p-2 bg-popover border-t border-b shadow-sm">
                    <MobileMenu />
                </div>
            }
        </nav>
    );
}
