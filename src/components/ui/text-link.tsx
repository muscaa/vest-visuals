"use client"

import {
    useRender,
    mergeProps,
} from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@shared/shadcn/lib/utils"

const textLinkVariants = cva(
    "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-4xl border border-transparent bg-clip-padding p focus-visible:ring-[3px] aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none",
    {
        variants: {
            variant: {
                default: "text-accent-foreground hover:underline font-semibold",
                ghost: "hover:underline hover:text-accent-foreground",
            },
            size: {
                default: "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
                xs: "h-6 gap-1 px-2.5 h6 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
                sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
                lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
                icon: "size-9",
                "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
                "icon-sm": "size-8",
                "icon-lg": "size-10",
                none: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "none",
        },
    }
)

function TextLink({
    className,
    render,
    variant = "default",
    size = "none",
    ...props
}: useRender.ComponentProps<"a"> & VariantProps<typeof textLinkVariants>) {
    return useRender({
        defaultTagName: "a",
        props: mergeProps<"a">(
            {
                className: cn(textLinkVariants({ variant, size, className })),
            },
            props
        ),
        render,
    })
}

export { TextLink, textLinkVariants }
