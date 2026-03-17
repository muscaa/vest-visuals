import logo_small from ":/logos/small.svg";
import logo_small_white from ":/logos/small-white.svg";
import logo_small_black from ":/logos/small-black.svg";
import logo_large from ":/logos/large.svg";
import logo_large_white from ":/logos/large-white.svg";
import logo_large_black from ":/logos/large-black.svg";
import Image from "next/image";
import { cn } from "@shared/shadcn/lib/utils";
import {
    Link,
    HOME,
} from "@shared/i18n";

interface LogoProps {
    className?: string;
}

export function LogoSmall(props: LogoProps) {
    return (
        <Image
            src={logo_small}
            alt="Vest Visuals Logo Small"
            className={cn("size-16", props.className)}
        />
    );
}

export function LogoSmallWhite(props: LogoProps) {
    return (
        <Image
            src={logo_small_white}
            alt="Vest Visuals Logo Small White"
            className={cn("size-16", props.className)}
        />
    );
}

export function LogoSmallBlack(props: LogoProps) {
    return (
        <Image
            src={logo_small_black}
            alt="Vest Visuals Logo Small Black"
            className={cn("size-16", props.className)}
        />
    );
}

export function LogoLarge(props: LogoProps) {
    return (
        <Image
            src={logo_large}
            alt="Vest Visuals Logo Large"
            className={cn("w-61.5 h-16", props.className)}
        />
    );
}

export function LogoLargeWhite(props: LogoProps) {
    return (
        <Image
            src={logo_large_white}
            alt="Vest Visuals Logo Large White"
            className={cn("w-61.5 h-16", props.className)}
        />
    );
}

export function LogoLargeBlack(props: LogoProps) {
    return (
        <Image
            src={logo_large_black}
            alt="Vest Visuals Logo Large Black"
            className={cn("w-61.5 h-16", props.className)}
        />
    );
}

interface LogoLinkProps extends LogoProps {
    href?: string;
    extraClassName?: string;
}

export function LogoSmallLink(props: LogoLinkProps) {
    return (
        <Link href={props.href ?? HOME()} className={cn("", props.extraClassName)}>
            <LogoSmall
                {...props}
            />
        </Link>
    );
}

export function LogoSmallWhiteLink(props: LogoLinkProps) {
    return (
        <Link href={props.href ?? HOME()} className={cn("", props.extraClassName)}>
            <LogoSmallWhite
                {...props}
            />
        </Link>
    );
}

export function LogoSmallBlackLink(props: LogoLinkProps) {
    return (
        <Link href={props.href ?? HOME()} className={cn("", props.extraClassName)}>
            <LogoSmallBlack
                {...props}
            />
        </Link>
    );
}

export function LogoLargeLink(props: LogoLinkProps) {
    return (
        <Link href={props.href ?? HOME()} className={cn("", props.extraClassName)}>
            <LogoLarge
                {...props}
            />
        </Link>
    );
}

export function LogoLargeWhiteLink(props: LogoLinkProps) {
    return (
        <Link href={props.href ?? HOME()} className={cn("", props.extraClassName)}>
            <LogoLargeWhite
                {...props}
            />
        </Link>
    );
}

export function LogoLargeBlackLink(props: LogoLinkProps) {
    return (
        <Link href={props.href ?? HOME()} className={cn("", props.extraClassName)}>
            <LogoLargeBlack
                {...props}
            />
        </Link>
    );
}
