"use client";

import { TextSpan } from "./typography";
import { cn } from "@shared/shadcn/lib/utils";
import { Separator } from "./ui/separator";

interface Props {
    num?: string;
    children?: React.ReactNode;
    className?: string;
}

export function Eyebrow(props: Props) {
    return (
        <div className={cn("flex items-center gap-4 mb-10", props.className)}>
            <TextSpan variant="muted" size="label" font="mono1">
                {props.num}
            </TextSpan>
            <Separator className="shrink" />
            <TextSpan variant="muted" size="label" font="mono1" className="shrink-0">
                {props.children}
            </TextSpan>
        </div>
    );
}
