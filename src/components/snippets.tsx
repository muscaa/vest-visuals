import Link from "next/link";

export function IconLink(props: { href: string, icon: React.ComponentType<{ size?: number, strokeWidth?: number, className?: string }> }) {
    return (
        <Link href={props.href} target="_blank" className="hover:text-primary transition-all">
            <props.icon size={24} strokeWidth={1.5} />
        </Link>
    );
}
