import { Card } from "@/components/ui/card";
import { cn } from "@shared/shadcn/utils";

interface HoverCardProps {
    children?: React.ReactNode;
    className?: string;
}

export function HoverCard(props: HoverCardProps) {
    return (
        <Card className={cn("shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300", props.className)}>
            {props.children}
        </Card>
    );
}
