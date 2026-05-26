"use client";

import { Navbar } from "@/components/navbar";
import { FooterLarge } from "@/components/footer";
import { cn } from "@shared/shadcn/lib/utils";
import { useMain } from "@/hooks/useMain";

export interface Navbar2LayoutProviderProps {
    children: React.ReactNode;
    nav?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}

export function Navbar2LayoutProvider(props: Navbar2LayoutProviderProps) {
    const { ref } = useMain();

    return (
        <>
            {
                props.nav ?? (
                    <Navbar />
                )
            }
            <div ref={ref} className={cn("flex flex-col max-h-full overflow-y-auto", props.className)}>
                {props.children}
                {
                    props.footer ?? (
                        <FooterLarge />
                    )
                }
            </div>
        </>
    );
}
