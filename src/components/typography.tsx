import { cva } from "class-variance-authority";
import { cn } from "@shared/shadcn/utils";
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";
import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import type { VariantProps } from "class-variance-authority";

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
                "lg-1": "text-lg-1 text-balance", // hero
                "lg-2": "text-lg-2 text-balance", // title
                "lg-3": "text-lg-3 text-balance", // display
                "lg-4": "text-lg-4 text-balance", // stat
                "md-1": "text-md-1 text-balance", // h1
                "md-2": "text-md-2 text-balance", // h2
                "md-3": "text-md-3 text-pretty", // h3 / lead
                "md-4": "text-md-4 text-pretty", // h4
                "sm-1": "text-sm-1", // body
                "sm-2": "text-sm-2", // sm
                "sm-3": "text-sm-3", // label
                "sm-4": "text-sm-4", // xs
            },
            font: {
                default: "",
                "sans-1": "font-sans uppercase",
                "sans-2": "font-sans",
                "mono-1": "font-mono uppercase",
                "mono-2": "font-mono",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            font: "default",
        },
    },
);

type Props = useRender.ComponentProps<"div"> &
    VariantProps<typeof textVariants>;

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
        props: mergeProps<"div">(
            { className: cn(textVariants({ variant, size, font, className })) },
            props,
        ),
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
    params,
    search,
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
            render={<Link to={to} params={params} search={search} />}
        />
    );
}

export function TextH1({
    variant = "default",
    size = "md-1",
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
    size = "md-2",
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
    size = "md-3",
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
    size = "md-4",
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
    size = "sm-3",
    font = "mono-1",
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
    size = "sm-3",
    font = "mono-2",
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
