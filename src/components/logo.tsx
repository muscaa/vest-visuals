import logo from ":/logos/vest-visuals-slim.svg";
import Image from "next/image";
import { cn } from "@shared/shadcn/lib/utils";
import {
    Link,
    HOME,
} from "@shared/i18n";

interface LogoProps {
    className?: string;
}

export function Logo(props: LogoProps) {
    return (
        <Image
            src={logo}
            alt="Logo"
            className={cn("size-16", props.className)}
        />
    );
}

export function LogoLink(props: LogoProps) {
    return (
        <Link href={HOME()}>
            <Logo
                {...props}
            />
        </Link>
    );
}
