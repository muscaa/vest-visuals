import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge<"heading">({
    extend: {
        classGroups: {
            heading: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
