"use client";

import { Button } from "@/components/ui/button";
import {
    locales,
    usePathname,
    useRouter,
} from "@shared/i18n";
import { useParams } from "next/navigation";

export function LanguageToggle() {
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();

    const handleClick = () => {
        const nextIndex = (locales.indexOf(params.locale as any) + 1) % locales.length;

        router.replace({
            pathname,
            params,
        } as any, {
            locale: locales[nextIndex]
        });
        router.refresh();
    };

    return (
        <Button variant="navbar" size="icon" onClick={handleClick} className="uppercase">
            {params.locale}
        </Button>
    );
}
