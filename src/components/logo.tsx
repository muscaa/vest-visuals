import { cn } from "@shared/shadcn/utils";

interface LogoProps {
    className?: string;
}

export function LogoSmall(props: LogoProps) {
    return (
        <img
            src="/logos/small.svg"
            alt="Vest Visuals Logo Small"
            className={cn("size-16", props.className)}
        />
    );
}

export function LogoSmallWhite(props: LogoProps) {
    return (
        <img
            src="/logos/small-white.svg"
            alt="Vest Visuals Logo Small White"
            className={cn("size-16", props.className)}
        />
    );
}

export function LogoSmallBlack(props: LogoProps) {
    return (
        <img
            src="/logos/small-black.svg"
            alt="Vest Visuals Logo Small Black"
            className={cn("size-16", props.className)}
        />
    );
}

export function LogoLarge(props: LogoProps) {
    return (
        <img
            src="/logos/large.svg"
            alt="Vest Visuals Logo Large"
            className={cn("w-61.5 h-16", props.className)}
        />
    );
}

export function LogoLargeWhite(props: LogoProps) {
    return (
        <img
            src="/logos/large-white.svg"
            alt="Vest Visuals Logo Large White"
            className={cn("w-61.5 h-16", props.className)}
        />
    );
}

export function LogoLargeBlack(props: LogoProps) {
    return (
        <img
            src="/logos/large-black.svg"
            alt="Vest Visuals Logo Large Black"
            className={cn("w-61.5 h-16", props.className)}
        />
    );
}
