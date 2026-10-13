import { cn } from "@shared/shadcn/utils";
import { Link } from "@tanstack/react-router";
import { LogoLarge, LogoSmall } from "../logo";
import { ThemeToggle } from "../theme";
import { LanguageToggle } from "../language-toggle";

export interface ScreenLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export function ScreenLayout(props: ScreenLayoutProps) {
    return (
        <>
            <div
                className={cn(
                    "flex flex-col flex-1 max-h-full overflow-y-auto",
                    props.className,
                )}
            >
                <header className="flex justify-between items-center gap-4 px-6 py-4 md:px-10 md:py-6">
                    <Link to="/home" aria-label="Vest Visuals">
                        <LogoSmall className="size-12 md:hidden" />
                        <LogoLarge className="hidden md:block w-auto h-12" />
                    </Link>
                    <div className="flex items-center gap-1">
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                </header>
                {props.children}
            </div>
        </>
    );
}
