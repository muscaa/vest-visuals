"use client";

import Image from "next/image";
import logo from "@/../public/logos/vest-visuals-slim.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useIsMobile } from "@/utils/hooks";
import { useState } from "react";
import {
    Menu,
    X
} from "lucide-react";

function NavbarLinkButton(props: { href: string, text: string }) {
    return (
        <Link href={props.href}>
            <Button variant="navbar">
                {props.text}
            </Button>
        </Link>
    );
}

function MenuButtons() {
    return (
        <>
            <NavbarLinkButton href="/" text="ACASA" />
            <NavbarLinkButton href="/portfolio" text="PORTOFOLIU" />
            <NavbarLinkButton href="/services" text="SERVICII" />
            <NavbarLinkButton href="/faq" text="FAQ" />
            <NavbarLinkButton href="/contact" text="CONTACT" />
            <ThemeToggle />
        </>
    );
}

export function Navbar() {
    const isMobile = useIsMobile();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="flex flex-col w-full h-16 justify-center items-center bg-background4 relative shadow-sm">
            <div className="flex size-full max-w-6xl justify-between items-center p-2">
                <Link href="/">
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
                            <MenuButtons />
                        )
                    }
                </div>
            </div>
            {
                isMobile == true && menuOpen &&
                <div className="absolute z-50 top-full flex flex-col gap-2 w-full max-w-6xl justify-center items-center p-2 bg-secondary border-t border-primary shadow-sm">
                    <MenuButtons />
                </div>
            }
        </nav>
    );
}
