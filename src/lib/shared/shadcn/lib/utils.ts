import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge<"typography">({
    extend: {
        classGroups: {
            typography: ["p1", "p2", "p3", "p4", "p", "p5", "p6", "h1", "h2", "h3", "h4", "h5", "h6"],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
