import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            "font-size": [
                {
                    text: [
                        "lg-1",
                        "lg-2",
                        "lg-3",
                        "lg-4",
                        "md-1",
                        "md-2",
                        "md-3",
                        "md-4",
                        "sm-1",
                        "sm-2",
                        "sm-3",
                        "sm-4",
                    ],
                },
            ],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
