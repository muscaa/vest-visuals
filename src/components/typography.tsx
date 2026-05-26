"use client";

import {
    cva,
    VariantProps,
} from "class-variance-authority";
import { cn } from "@shared/shadcn/lib/utils";
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";
import { Link, LinkProps } from "./link";

export const textVariants = cva(
    "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 border-transparent bg-clip-padding focus-visible:ring-[3px] aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 items-center transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none outline-none group/text",
    {
        variants: {
            variant: {
                default: "",
                foreground: "text-foreground",
                muted: "text-muted-foreground",
                link: "underline-offset-4 text-accent-foreground hover:underline font-medium",
                ghost: "underline-offset-4 hover:underline hover:text-accent-foreground",
            },
            size: {
                default: "",
                display: "text-display text-balance",
                stat: "text-stat text-balance",
                h1: "text-h1 text-balance",
                h2: "text-h2 text-balance",
                h3: "text-h3 text-balance",
                h4: "text-h4 text-balance",
                lead: "text-lead text-pretty",
                body: "text-body",
                sm: "text-sm",
                label: "text-label",
            },
            font: {
                default: "",
                mono1: "font-mono uppercase",
                mono2: "font-mono",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            font: "default",
        },
    }
);

type Props = useRender.ComponentProps<"div"> & VariantProps<typeof textVariants>;

export function Text({
    variant = "default",
    size = "default",
    font = "default",
    render,
    className,
    ...props
}: Props) {
    const element = useRender({
        defaultTagName: "div",
        render,
        props: mergeProps<"div">({ className: cn(textVariants({ variant, size, font, className })) }, props),
    });

    return element;
}

export function TextSpan({
    variant = "default",
    size = "default",
    font = "default",
    ...props
}: Props) {
    return (
        <Text
            {...props}
            variant={variant}
            size={size}
            font={font}
            render={<span />}
        />
    );
}

export function TextP({
    variant = "default",
    size = "default",
    font = "default",
    ...props
}: Props) {
    return (
        <Text
            {...props}
            variant={variant}
            size={size}
            font={font}
            render={<p />}
        />
    );
}

export function TextLink({
    to,
    href,
    variant = "link",
    size = "default",
    font = "default",
    ...props
}: Props & LinkProps) {
    return (
        <Text
            {...props}
            variant={variant}
            size={size}
            font={font}
            render={<Link href={to ?? href} />}
        />
    );
}

export function TextH1({
    variant = "default",
    size = "h1",
    font = "default",
    ...props
}: Props) {
    return (
        <Text
            {...props}
            variant={variant}
            size={size}
            font={font}
            render={<h1 />}
        />
    );
}

export function TextH2({
    variant = "default",
    size = "h2",
    font = "default",
    ...props
}: Props) {
    return (
        <Text
            {...props}
            variant={variant}
            size={size}
            font={font}
            render={<h2 />}
        />
    );
}

export function TextH3({
    variant = "default",
    size = "h3",
    font = "default",
    ...props
}: Props) {
    return (
        <Text
            {...props}
            variant={variant}
            size={size}
            font={font}
            render={<h3 />}
        />
    );
}

export function TextH4({
    variant = "default",
    size = "h4",
    font = "default",
    ...props
}: Props) {
    return (
        <Text
            {...props}
            variant={variant}
            size={size}
            font={font}
            render={<h4 />}
        />
    );
}

export function TextH5({
    variant = "default",
    size = "label",
    font = "mono1",
    ...props
}: Props) {
    return (
        <Text
            {...props}
            variant={variant}
            size={size}
            font={font}
            render={<h5 />}
        />
    );
}

export function TextH6({
    variant = "default",
    size = "label",
    font = "mono2",
    ...props
}: Props) {
    return (
        <Text
            {...props}
            variant={variant}
            size={size}
            font={font}
            render={<h6 />}
        />
    );
}
