import { Button } from "@/components/ui/button";
import { ImgHTMLAttributes } from "react";
import { Link } from "@shared/i18n";

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

export function ButtonLink({ href, target, prefetch, children, ...props }: { href: string, target?: string, prefetch?: boolean, children?: React.ReactNode } & React.ComponentProps<typeof Button>) {
    return (
        <Link href={href} target={target} prefetch={prefetch}>
            <Button {...props} className={`cursor-pointer ${props.className}`}>
                {children}
            </Button>
        </Link>
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
