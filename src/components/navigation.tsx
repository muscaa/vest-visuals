import { useIsMobile } from "@client/shadcn/hooks/use-mobile";
import { IconMenu } from "@tabler/icons-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { NavigationMenu } from "./ui/navigation-menu";

function MobileNavigation(props: NavigationProps) {
    return (
        <Sheet>
            <SheetTrigger>
                <IconMenu />
            </SheetTrigger>
            <SheetContent side="top" className="max-h-full overflow-y-auto">
                <div className="flex flex-col w-full h-100 bg-red-400">
                    {/* TODO */}
                </div>
            </SheetContent>
        </Sheet>
    );
}

function DesktopNavigation(props: NavigationProps) {
    return (
        <NavigationMenu>
            <div className="flex flex-col w-100 h-full bg-red-400">
                {/* TODO */}
            </div>
        </NavigationMenu>
    );
}

export interface NavigationProps {}

export function Navigation(props: NavigationProps) {
    const { isMobileState } = useIsMobile();

    if (isMobileState === undefined) {
        return null;
    }

    return (
        (isMobileState && <MobileNavigation {...props} />) || (
            <DesktopNavigation {...props} />
        )
    );
}
