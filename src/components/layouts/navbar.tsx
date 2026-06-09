"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { cn } from "@shared/shadcn/lib/utils";
import { useMain } from "@/hooks/useMain";

export interface NavbarLayoutProps {
    children: React.ReactNode;
    nav?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}

export function NavbarLayout(props: NavbarLayoutProps) {
    const { ref } = useMain();

    return (
        <>
            {
                props.nav ?? (
                    <Navbar
                        entries={[]}
                    />
                )
            }
            <div ref={ref} className={cn("flex flex-col max-h-full overflow-y-auto", props.className)}>
                {props.children}
                {
                    props.footer ?? (
                        <Footer
                            sections={[]}
                        />
                    )
                }
            </div>
        </>
    );
}
