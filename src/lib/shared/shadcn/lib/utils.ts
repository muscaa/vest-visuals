import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge<"typography">({
    extend: {
        classGroups: {
            typography: ["text-display", "text-stat", "text-h1", "text-h2", "text-h3", "text-h4", "text-lead", "text-body", "text-sm", "text-label"],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
