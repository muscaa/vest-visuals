import { cn } from "@shared/shadcn/utils";
import { Card } from "@/components/ui/card";

type HoverCardProps = React.ComponentProps<typeof Card>;

export function HoverCard({ className, ...props }: HoverCardProps) {
    return (
        <Card
            className={cn(
                "shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300",
                className,
            )}
            {...props}
        />
    );
}
