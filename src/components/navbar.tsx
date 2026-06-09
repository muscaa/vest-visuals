"use client";

import { cn } from "@shared/shadcn/lib/utils";
import { LogoSmallLink } from "./logo";
import { Navigation, NavigationEntry } from "./navigation";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";

export interface NavbarProps {
    entries?: NavigationEntry[];
    left?: React.ReactNode;
    right?: React.ReactNode;
    className?: string;
}

export function Navbar(props: NavbarProps) {
    return (
        <nav className={cn("z-50 flex flex-col justify-center items-center w-full h-16 p-2 shrink-0 bg-background border-b", props.className)}>
            <div className={cn("relative flex size-full max-w-7xl justify-between items-center", props.className)}>
                {
                    props.left ?? (
                        <LogoSmallLink />
                    )
                }
                {
                    props.right ?? (
                        <Navigation
                            entries={props.entries ?? []}
                            end={(
                                <>
                                    <ThemeToggle />
                                    <LanguageToggle />
                                </>
                            )}
                        />
                    )
                }
            </div>
        </nav>
    );
}
