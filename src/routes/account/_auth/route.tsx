import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { LanguageToggle } from "@/components/language-toggle";
import { LogoLarge, LogoSmall } from "@/components/logo";
import { ThemeToggle } from "@/components/theme";

export const Route = createFileRoute("/account/_auth")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        // the page scrolls here (body is fixed to the screen height)
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
            <header className="flex justify-between items-center gap-4 px-6 py-4 md:px-10 md:py-6">
                <Link to="/home" aria-label="Vest Visuals">
                    <LogoSmall className="size-12 md:hidden" />
                    <LogoLarge className="hidden md:block w-auto h-12" />
                </Link>
                <div className="flex items-center gap-1">
                    <ThemeToggle />
                    <LanguageToggle />
                </div>
            </header>
            <main className="flex flex-col flex-1 items-center px-6 pb-10 md:px-10">
                {/* auto margins center the card when there is room and never push it off screen */}
                <div className="flex justify-center w-full my-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
