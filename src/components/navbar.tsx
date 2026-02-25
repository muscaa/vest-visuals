"use client";

import Image from "next/image";
import logo from ":/logos/vest-visuals-slim.svg";
import {
    Button,
    buttonVariants,
} from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Fragment, useState } from "react";
import {
    Menu,
    X
} from "lucide-react";
import { ButtonLink, Icon } from "@/components/snippets";
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
import { Single } from "@type/utils";

type NavEndpoint = {
    title: string;
    icon?: Icon;
} & Single<{
    link: React.ComponentProps<typeof Link>;
    button: React.ComponentProps<typeof Button>;
    component: React.ComponentType<{ children: React.ReactNode; }>;
}>;

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
        link: {
            href: HOME(),
        },
    },
    {
        type: "list",
        title: "EVENIMENTE",
        endpoints: [
            {
                title: "NUNTA",
                link: {
                    href: SERVICES_WEDDING(),
                },
            },
            {
                title: "BOTEZ",
                link: {
                    href: SERVICES_CHRISTENING(),
                },
            },
            // {
            //     title: "ANIVERSARE",
            //     href: CONTACT(),
            // },
            {
                title: "MAJORAT",
                link: {
                    href: SERVICES_18TH_BIRTHDAY(),
                },
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
                link: {
                    href: SERVICES_OUTDOOR(),
                },
            },
        ],
    },
    {
        type: "list",
        title: "COMERCIAL",
        endpoints: [
            {
                title: "IMOBILIARE (REAL ESTATE)",
                link: {
                    href: SERVICES_REAL_ESTATE(),
                },
            },
            {
                title: "AUTOMOTIVE",
                link: {
                    href: SERVICES_AUTOMOTIVE(),
                },
            },
            // {
            //     title: "PRODUSE E-COMMERCE",
            //     href: CONTACT(),
            // },
            {
                title: "PROMOVARE FIRME (MARKETING)",
                link: {
                    href: SERVICES_MARKETING(),
                },
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
        link: {
            href: CONTACT(),
        },
    },
];

interface MenuProps {
    links: NavLink[];
}

function WideMenu(props: MenuProps) {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {
                    props.links.map((link, index) => (
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
                                                            <NavigationMenuLink render={ // TODO refactor
                                                                endpoint.link && (
                                                                    <Link {...endpoint.link}>
                                                                        {
                                                                            endpoint.icon && (
                                                                                <endpoint.icon className="mr-2" />
                                                                            )
                                                                        }
                                                                        {endpoint.title}
                                                                    </Link>
                                                                ) || endpoint.button && (
                                                                    <Button {...endpoint.button}>
                                                                        {
                                                                            endpoint.icon && (
                                                                                <endpoint.icon className="mr-2" />
                                                                            )
                                                                        }
                                                                        {endpoint.title}
                                                                    </Button>
                                                                ) || endpoint.component && (
                                                                    <endpoint.component>
                                                                        {
                                                                            endpoint.icon && (
                                                                                <endpoint.icon className="mr-2" />
                                                                            )
                                                                        }
                                                                        {endpoint.title}
                                                                    </endpoint.component>
                                                                )
                                                            } />
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </NavigationMenuContent>
                                    </>
                                ) || link.type === "endpoint" && (
                                    <NavigationMenuLink base="trigger" variant="ghost" render={ // TODO refactor
                                        link.link && (
                                            <Link {...link.link}>
                                                {
                                                    link.icon && (
                                                        <link.icon className="mr-2" />
                                                    )
                                                }
                                                {link.title}
                                            </Link>
                                        ) || link.button && (
                                            <Button variant="navbar" {...link.button}>
                                                {
                                                    link.icon && (
                                                        <link.icon className="mr-2" />
                                                    )
                                                }
                                                {link.title}
                                            </Button>
                                        ) || link.component && (
                                            <link.component>
                                                {
                                                    link.icon && (
                                                        <link.icon className="mr-2" />
                                                    )
                                                }
                                                {link.title}
                                            </link.component>
                                        )
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

function MobileMenu(props: MenuProps) {
    return (
        <>
            {
                props.links.map((link, index) => (
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
                                                { // TODO refactor
                                                    endpoint.link && (
                                                        <ButtonLink variant="navbar" {...endpoint.link}>
                                                            {
                                                                endpoint.icon && (
                                                                    <endpoint.icon className="mr-2" />
                                                                )
                                                            }
                                                            {endpoint.title}
                                                        </ButtonLink>
                                                    ) || endpoint.button && (
                                                        <Button variant="navbar" {...endpoint.button}>
                                                            {
                                                                endpoint.icon && (
                                                                    <endpoint.icon className="mr-2" />
                                                                )
                                                            }
                                                            {endpoint.title}
                                                        </Button>
                                                    ) || endpoint.component && (
                                                        <endpoint.component>
                                                            {
                                                                endpoint.icon && (
                                                                    <endpoint.icon className="mr-2" />
                                                                )
                                                            }
                                                            {endpoint.title}
                                                        </endpoint.component>
                                                    )
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>
                            </CollapsibleContent>
                        </Collapsible>
                    ) || link.type === "endpoint" && (
                        <Fragment key={index}>
                            { // TODO refactor
                                link.link && (
                                    <ButtonLink variant="navbar" {...link.link}>
                                        {
                                            link.icon && (
                                                <link.icon className="mr-2" />
                                            )
                                        }
                                        {link.title}
                                    </ButtonLink>
                                ) || link.button && (
                                    <Button variant="navbar" {...link.button}>
                                        {
                                            link.icon && (
                                                <link.icon className="mr-2" />
                                            )
                                        }
                                        {link.title}
                                    </Button>
                                ) || link.component && (
                                    <link.component>
                                        {
                                            link.icon && (
                                                <link.icon className="mr-2" />
                                            )
                                        }
                                        {link.title}
                                    </link.component>
                                )
                            }
                        </Fragment>
                    )
                ))
            }
            <ThemeToggle />
        </>
    );
}

export interface NavbarProps {
    logo?: React.ReactNode;
    links?: NavLink[];
    className?: string;
}

export function Navbar(props: NavbarProps) {
    const isMobile = useIsMobile();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="flex flex-col w-full h-16 justify-center items-center bg-card relative shadow-sm z-50">
            <div className={cn("flex size-full max-w-6xl justify-between items-center p-2", props.className)}>
                {
                    props.logo ?? (
                        <Link href={HOME()}>
                            <Image
                                src={logo}
                                alt="Logo"
                                className="size-16"
                            />
                        </Link>
                    )
                }
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
                            <WideMenu links={props.links ?? navLinks} />
                        )
                    }
                </div>
            </div>
            {
                isMobile == true && menuOpen &&
                <div className="absolute z-50 top-full flex flex-col justify-center items-center gap-2 w-full max-w-6xl p-2 bg-popover border-t border-b shadow-sm">
                    <MobileMenu links={props.links ?? navLinks} />
                </div>
            }
        </nav>
    );
}
