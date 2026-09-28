import { cn } from "@shared/shadcn/utils";

export function Main({ className, ...props }: React.ComponentProps<"main">) {
    return (
        <main
            className={cn("flex flex-col min-h-screen-no-nav shrink-0", className)}
            {...props}
        />
    );
}
