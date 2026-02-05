"use client";

import { Navbar } from "@/components/navbar";
import { FooterLarge } from "@/components/footer";
import { cn } from "@shared/shadcn/lib/utils";

export interface MainProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    extraClassName?: string;
}

export function NavbarLayoutProvider(props: MainProps) {
    return (
        <>
            {
                props.header ?? (
                    <Navbar />
                )
            }
            <div className={cn("flex flex-col max-h-full overflow-y-auto", props.className)}>
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
