"use client";

import Image from "next/image";
import logo from ":/logos/vest-visuals-slim.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useState } from "react";
import {
    Menu,
    X
} from "lucide-react";
import { ButtonLink } from "@/components/snippets";

export function LogoSegment() {
    return (
        <Link href="/?more">
            <Image
                src={logo}
                alt="Logo"
                className="size-16"
            />
        </Link>
    );
}

export function MenuSegment() {
    return (
        <>
            <ButtonLink href="/?more" variant="navbar">ACASA</ButtonLink>
            <ButtonLink href="/portfolio" variant="navbar">PORTOFOLIU</ButtonLink>
            <ButtonLink href="/services" variant="navbar">SERVICII</ButtonLink>
            <ButtonLink href="/faq" variant="navbar">FAQ</ButtonLink>
            <ButtonLink href="/contact" variant="navbar">CONTACT</ButtonLink>
            <ThemeToggle />
        </>
    );
}

export interface NavbarProps {
    logo?: React.ReactNode;
    menu?: React.ReactNode;
}

export function Navbar(props: NavbarProps) {
    const isMobile = useIsMobile();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="flex flex-col w-full h-16 justify-center items-center bg-background4 relative shadow-sm">
            <div className="flex size-full max-w-6xl justify-between items-center p-2">
                {
                    props.logo ?? (
                        <LogoSegment />
                    )
                }
                <div className="flex items-center gap-2">
                    {
                        isMobile == true && (
                            <>
                                <Button variant="navbar" onClick={() => setMenuOpen(!menuOpen)}>
                                    {
                                        menuOpen && (
                                            <X strokeWidth={1.5} className="size-6" />
                                        ) || (
                                            <Menu strokeWidth={1.5} className="size-6" />
                                        )
                                    }
                                </Button>
                            </>
                        ) || isMobile == false && (
                            props.menu ?? (
                                <MenuSegment />
                            )
                        )
                    }
                </div>
            </div>
            {
                isMobile == true && menuOpen &&
                <div className="absolute z-50 top-full flex flex-col gap-2 w-full max-w-6xl justify-center items-center p-2 bg-secondary border-t border-primary shadow-sm">
                    {
                        props.menu ?? (
                            <MenuSegment />
                        )
                    }
                </div>
            }
        </nav>
    );
}
