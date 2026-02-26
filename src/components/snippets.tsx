import { buttonVariants } from "@/components/ui/button";
import { ImgHTMLAttributes } from "react";
import { Link } from "@shared/i18n";
import { VariantProps } from "class-variance-authority";
import { cn } from "@shared/shadcn/lib/utils";

export interface IconProps {
    size?: number;
    strokeWidth?: number;
    className?: string;
}
export type Icon = React.ComponentType<IconProps>;

export function IconLink(props: { href: string, icon: Icon }) {
    return (
        <Link href={props.href} target="_blank" className="hover:text-primary transition-all">
            <props.icon size={24} strokeWidth={1.5} />
        </Link>
    );
}

export function ButtonLink({ className, variant = "default", size = "default", ...props }: React.ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>) {
    return (
        <Link
            className={cn("cursor-pointer", buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            fetchPriority="low"
            loading="lazy"
            decoding="async"
            {...props}
        />
    );
}
