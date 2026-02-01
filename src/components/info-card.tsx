"use client";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { cn } from "@shared/shadcn/lib/utils";

interface Props {
    children?: React.ReactNode;
    className?: string;
    extraClassName?: string;
}

export function InfoCard(props: Props) {
    return (
        <Card className={cn("p-0 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-visible", props.extraClassName)}>
            <CardContent className={cn("relative flex p-10 w-sm", props.className)}>
                {props.children}
            </CardContent>
        </Card>
    );
}
