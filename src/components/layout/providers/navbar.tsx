"use client";

import { Navbar } from "@/components/navbar";
import { FooterLarge } from "@/components/footer";
import { cn } from "@shared/shadcn/lib/utils";
import { useMain } from "@/hooks/useMain";

export interface NavbarLayoutProviderProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    extraClassName?: string;
}

export function NavbarLayoutProvider(props: NavbarLayoutProviderProps) {
    const { ref } = useMain();

    return (
        <>
            {
                props.header ?? (
                    <Navbar />
                )
            }
            <div ref={ref} className={cn("flex flex-col max-h-full overflow-y-auto", props.className)}>
                <main className={cn("grow", props.extraClassName)}>
                    {props.children}
                </main>
                {
                    props.footer ?? (
                        <FooterLarge />
                    )
                }
            </div>
        </>
    );
}
