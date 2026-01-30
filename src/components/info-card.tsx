"use client";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { cn } from "@shared/shadcn/lib/utils";

interface Props {
    children?: React.ReactNode;
    className?: string;
}

export function InfoCard(props: Props) {
    return (
        <Card className="p-0 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ring-transparent">
            <CardContent className={cn("p-10 w-sm", props.className)}>
                {props.children}
            </CardContent>
        </Card>
    );
}
