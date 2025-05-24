"use client";

import Image from "next/image";
import logo from "@/../public/logos/vest-visuals-slim.svg";

export function Navbar() {
    return (
        <nav className="flex flex-col w-full h-16 justify-center items-center bg-secondary relative">
            <div className="flex size-full max-w-6xl justify-between items-center p-2">
                <Image
                    src={logo}
                    alt="Logo"
                    className="size-16"
                />
            </div>
            {/*
                isMobile == true && menuOpen &&
                <div className="absolute top-full flex flex-col gap-2 w-full max-w-6xl justify-center p-2 bg-davys-gray border-t border-border">
                    <SharedLinkButtons />
                </div>
            */}
        </nav>
    );
}
