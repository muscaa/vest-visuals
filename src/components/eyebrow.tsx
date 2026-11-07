import { cn } from "@shared/shadcn/utils";
import { TextSpan } from "./typography";
import { Separator } from "./ui/separator";

// how far the lines reach past the content box to hit the screen edges.
// assumes the content box is horizontally centered on the screen (true for sections).
const bleedLeft = "ml-[calc(50%-50vw)]";
const bleedRight = "mr-[calc(50%-50vw)]";
// a line that only exists in the bleed area (from the screen edge up to the gap before the text)
const bleedOnly = "flex-none data-horizontal:w-[calc(50vw-50%-1rem)]";

interface EyebrowProps {
    children?: React.ReactNode;
    /** Where the text sits, relative to the content box. */
    align?: "start" | "center" | "end";
    /** Extend the lines to the screen edges. Turn off when not inside a centered, full-width section. */
    bleed?: boolean;
    className?: string;
}

export function Eyebrow({
    children,
    align = "start",
    bleed = true,
    className,
}: EyebrowProps) {
    const showLeft = bleed || align !== "start";
    const showRight = bleed || align !== "end";

    return (
        <div className={cn("flex items-center mb-6", className)}>
            {
                showLeft && (
                    <Separator
                        className={cn(
                            "flex-1 mr-4",
                            bleed && bleedLeft,
                            align === "start" && bleedOnly,
                        )}
                    />
                )
            }
            <TextSpan
                variant="muted"
                size="sm-3"
                font="mono-1"
                className="shrink-0"
            >
                {children}
            </TextSpan>
            {
                showRight && (
                    <Separator
                        className={cn(
                            "flex-1 ml-4",
                            bleed && bleedRight,
                            align === "end" && bleedOnly,
                        )}
                    />
                )
            }
        </div>
    );
}
