import {
    Navbar,
    NavbarProps,
} from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";
import logo from ":/logos/vest-visuals-slim.svg";
import { ButtonLink } from "@/components/snippets";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function LogoSegment() {
    return (
        <Link href="/a" className="relative">
            <Image
                src={logo}
                alt="Logo"
                className="size-16"
            />
            <h6 className="absolute bottom-2 -right-5">ADMIN</h6>
        </Link>
    );
}

export function MenuSegment() {
    return (
        <>
            <ButtonLink href="/a/media" variant="navbar">MEDIA</ButtonLink>
            <ButtonLink href="/a/cli" variant="navbar">CLI</ButtonLink>
            <ThemeToggle />
        </>
    );
}

export function NavbarAdmin(props: NavbarProps) {
    return (
        <Navbar
            logo={<LogoSegment />}
            menu={<MenuSegment />}
            {...props}
        />
    );
}
