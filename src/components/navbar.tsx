import { cn } from "@shared/shadcn/utils";
import { Link } from "@tanstack/react-router";
import { LogoSmall } from "./logo";

export interface NavbarRootProps {
    children?: React.ReactNode;
    className?: string;
}

export function NavbarRoot(props: NavbarRootProps) {
    return (
        <nav
            className={cn(
                "z-50 flex flex-col justify-center items-center w-full h-16 p-2 shrink-0 bg-card border-b",
                props.className,
            )}
        >
            {props.children}
        </nav>
    );
}

export interface NavbarContentProps {
    children?: React.ReactNode;
    start?: React.ReactNode;
    className?: string;
}

export function NavbarContent(props: NavbarContentProps) {
    return (
        <div
            className={cn(
                "relative flex size-full max-w-7xl justify-between items-center",
                props.className,
            )}
        >
            {props.start ?? (
                <Link to="/software">
                    <LogoSmall />
                </Link>
            )}
            {props.children}
        </div>
    );
}

export function Navbar(props: NavbarContentProps) {
    return (
        <NavbarRoot>
            <NavbarContent {...props} />
        </NavbarRoot>
    );
}
