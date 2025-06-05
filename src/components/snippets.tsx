import Link from "next/link";
import { Button } from "@/components/ui/button";

export function IconLink(props: { href: string, icon: React.ComponentType<{ size?: number, strokeWidth?: number, className?: string }> }) {
    return (
        <Link href={props.href} target="_blank" className="hover:text-primary transition-all">
            <props.icon size={24} strokeWidth={1.5} />
        </Link>
    );
}

export function ButtonLink({ href, target, children, ...props } : { href: string, target?: string, children?: React.ReactNode } & React.ComponentProps<typeof Button>) {
    return (
        <Link href={href} target={target}>
            <Button {...props} className={`cursor-pointer ${props.className}`}>
                {children}
            </Button>
        </Link>
    );
}
