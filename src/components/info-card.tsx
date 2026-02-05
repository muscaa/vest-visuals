"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@shared/shadcn/lib/utils";

interface Props {
    children?: React.ReactNode;
    className?: string;
}

export function InfoCard(props: Props) {
    return (
        <Card className={cn("shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300", props.className)}>
            {props.children}
        </Card>
    );
}
