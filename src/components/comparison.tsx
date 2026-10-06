import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@shared/shadcn/utils";
import { IconGripVertical } from "@tabler/icons-react";

interface Props {
    before: React.ReactNode;
    after: React.ReactNode;
    mode?: "drag" | "hover";
    className?: string;
}

export function Comparison(props: Props) {
    const [inset, setInset] = useState<number>(50);
    const [active, setActive] = useState<boolean>(false);

    const onPointerMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!active) return;

        e.preventDefault();
        e.stopPropagation();

        const rect = e.currentTarget.getBoundingClientRect();
        let x = 0;

        if ("touches" in e && e.touches.length > 0) {
            x = e.touches[0].clientX - rect.left;
        } else if ("clientX" in e) {
            x = e.clientX - rect.left;
        }

        const percentage = (x / rect.width) * 100;
        setInset(percentage);
    };

    return (
        <div
            className={cn("relative size-full overflow-hidden rounded-2xl select-none", props.className)}
            onPointerMove={onPointerMove}
            onPointerUp={() => setActive(false)}
            onPointerEnter={() => setActive(false)}
            onPointerLeave={() => setActive(false)}
        >
            <div
                className="absolute left-0 top-0 size-full"
                style={{
                    clipPath: `inset(0 ${100 - inset}% 0 0)`
                }}
            >
                {props.before}
            </div>
            <div
                className="absolute left-0 top-0 size-full"
                style={{
                    clipPath: `inset(0 0 0 ${inset}%)`,
                }}
            >
                {props.after}
            </div>
            <div
                className="absolute w-1 h-full top-0 -translate-x-1/2 select-none bg-secondary"
                style={{
                    left: inset + "%",
                }}
            >
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute w-6 h-12 left-1/2 top-1/2 -translate-1/2 cursor-ew-resize touch-none"
                    aria-haspopup
                    onPointerDown={(e) => {
                        setActive(true);
                        onPointerMove(e);
                    }}
                    onPointerUp={() => setActive(false)}
                >
                    <IconGripVertical className="size-6 select-none" />
                </Button>
            </div>
        </div>
    );
};
