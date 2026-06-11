import { cn } from "@shared/shadcn/lib/utils";

type Props = React.ComponentProps<"main">;

export function Main({ className, ...props }: Props) {
    return (
        <main
            className={cn("flex flex-col min-h-screen-no-nav shrink-0", className)}
            {...props}
        />
    );
}
