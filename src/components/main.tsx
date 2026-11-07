import { cn } from "@shared/shadcn/utils";
import { cva, VariantProps } from "class-variance-authority";

const mainVariants = cva(
    "flex flex-col shrink-0",
    {
        variants: {
            variant: {
                navbar: "min-h-screen-no-nav",
                screen: "grow px-6 pb-10 md:px-10",
            },
        },
        defaultVariants: {
            variant: "navbar",
        },
    },
);

export function Main({ variant = "navbar", className, ...props }: React.ComponentProps<"main"> & VariantProps<typeof mainVariants>) {
    return (
        <main
            className={cn(mainVariants({ variant, className }))}
            {...props}
        />
    );
}
