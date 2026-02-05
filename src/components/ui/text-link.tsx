"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@shared/shadcn/lib/utils"
import { Link } from "@shared/i18n"

const textLinkVariants = cva(
    "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-lg border border-transparent bg-clip-padding p focus-visible:ring-[3px] aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none",
    {
        variants: {
            variant: {
                default: "underline-offset-4 text-accent-foreground hover:underline font-medium",
                ghost: "underline-offset-4 hover:underline hover:text-accent-foreground",
            },
            size: {
                // default: "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
                xs: "h-6 gap-1 px-2.5 p6 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
                sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 size-8 [&_svg:not([class*='size-'])]:size-4",
                default: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-6",
                lg: "h-12 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-8",
                // icon: "size-9",
                "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
                "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-4",
                icon: "size-10 [&_svg:not([class*='size-'])]:size-6",
                "icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-8",
                "icon-responsive": "size-10 [&_svg:not([class*='size-'])]:size-6 lg:size-12 lg:[&_svg:not([class*='size-'])]:size-8",
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
    variant = "default",
    size = "none",
    ...props
}: React.ComponentProps<typeof Link> & VariantProps<typeof textLinkVariants>) {
    return (
        <Link
            className={cn(textLinkVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { TextLink, textLinkVariants }
