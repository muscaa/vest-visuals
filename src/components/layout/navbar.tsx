import { cn } from "@shared/shadcn/utils";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import type { LinkOptions } from "@tanstack/react-router";

export interface NavbarLayoutProps {
    children: React.ReactNode;
    navigation: React.ReactNode;
    footer?: React.ReactNode;
    /** where the navbar logo leads */
    home?: LinkOptions;
    className?: string;
}

export function NavbarLayout(props: NavbarLayoutProps) {
    return (
        <>
            <Navbar home={props.home}>{props.navigation}</Navbar>
            <div
                className={cn(
                    "flex flex-col max-h-full overflow-y-auto",
                    props.className,
                )}
            >
                {props.children}
                {
                    props.footer ?? (
                        <Footer />
                    )
                }
            </div>
        </>
    );
}
