import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export function ButtonLink({ href, target, prefetch, children, ...props } : { href: string, target?: string, prefetch?: boolean, children?: React.ReactNode } & React.ComponentProps<typeof Button>) {
    return (
        <Link href={href} target={target} prefetch={prefetch}>
            <Button {...props} className={`cursor-pointer ${props.className}`}>
                {children}
            </Button>
        </Link>
    );
}
