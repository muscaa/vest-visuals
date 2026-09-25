import { cn } from "@shared/shadcn/utils";
import { Navbar } from "../navbar";

export interface NavbarLayoutProps {
    children: React.ReactNode;
    navigation: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}

export function NavbarLayout(props: NavbarLayoutProps) {
    return (
        <>
            <Navbar>{props.navigation}</Navbar>
            <div
                className={cn(
                    "flex flex-col max-h-full overflow-y-auto",
                    props.className,
                )}
            >
                {props.children}
                {props.footer ??
                    props.footer // TODO
                }
            </div>
        </>
    );
}
