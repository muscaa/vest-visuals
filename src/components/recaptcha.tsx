"use client";

import { cn } from "@shared/shadcn/lib/utils";
import { ShieldCheck } from "lucide-react";

interface BadgeProps {
    className?: string;
}

export function ReCaptchaBadge(props: BadgeProps) {
    return (
        <div className={cn("flex flex-col", props.className)}>
            <span className="text-center inline">
                <ShieldCheck className="size-6 inline align-middle mr-1" />
                Protected by reCAPTCHA
            </span>
            {/* TODO: add links */}
        </div>
    );
}
