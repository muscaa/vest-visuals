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
                "relative z-60 flex flex-col justify-center items-center w-full h-16 px-6 py-2 shrink-0 bg-card shadow-sm transition-all duration-200 ease-in-out",
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
                <Link to="/home">
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
