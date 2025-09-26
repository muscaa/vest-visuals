"use client";

import { cn } from "@shared/shadcn/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "../ui/separator";

interface BaseListEntryProps extends React.ComponentProps<"div"> {
    isSelected: () => boolean;
    select: () => void;
    children?: React.ReactNode;
}

export function BaseListEntry({ isSelected, select, children, ...props }: BaseListEntryProps) {
    return (
        <div
            onClick={() => select()}
            className={cn(buttonVariants({
                variant: "card",
                size: "none",
                className: `${isSelected() ? "border-accent-foreground dark:border-accent-foreground" : ""}`
            }))}
            {...props}
        >
            {children}
        </div>
    );
}

interface BaseListProps {
    header?: React.ReactNode;
    entries?: React.ReactNode;
}

export function BaseList(props: BaseListProps) {
    return (
        <div className="flex flex-col size-full gap-2">
            {
                props.header && (
                    <>
                        <div className="flex flex-wrap gap-2">
                            {props.header}
                        </div>
                        <Separator />
                    </>
                )
            }
            <div className="flex flex-col max-h-full h-full overflow-y-auto">
                <div className="flex flex-col grow gap-2">
                    {props.entries}
                </div>
            </div>
        </div>
    );
}
