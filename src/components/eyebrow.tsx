import { TextSpan } from "./typography";
import { cn } from "@shared/shadcn/utils";
import { Separator } from "./ui/separator";

interface EyebrowProps {
    num?: string;
    children?: React.ReactNode;
    className?: string;
}

export function Eyebrow(props: EyebrowProps) {
    return (
        <div className={cn("flex items-center gap-4 mb-10", props.className)}>
            <TextSpan variant="muted" size="sm-3" font="mono-1" className="shrink-0">
                {props.num}
            </TextSpan>
            <Separator className="shrink" />
            <TextSpan variant="muted" size="sm-3" font="mono-1" className="shrink-0">
                {props.children}
            </TextSpan>
        </div>
    );
}
