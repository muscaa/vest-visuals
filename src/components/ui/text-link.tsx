import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

import { cn } from "@shared/shadcn/lib/utils";

const textLinkVariants = cva(
  "transition-all underline-offset-4 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "text-accent-foreground hover:underline font-semibold",
        ghost:
          "hover:underline hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
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
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<typeof Link> &
  VariantProps<typeof textLinkVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : Link;

  return (
    <Comp
      data-slot="a"
      className={cn(textLinkVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { TextLink, textLinkVariants }
