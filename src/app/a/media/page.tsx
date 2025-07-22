"use client";

import { MainAdmin } from "@/components/admin/main";
import { ButtonLink } from "@/components/snippets";

export default function Page() {
    const links: { [key: string]: string; } = {
        "Media Groups": "/a/media/groups",
        "Media Variants": "/a/media/variants",
    };

    return (
        <MainAdmin>
            <div className="flex justify-center items-center size-full p-2">
                <div className="flex flex-col w-full max-w-4xl gap-2">
                    {
                        Object.entries(links).map(([name, href], index) => (
                            <ButtonLink
                                key={index}
                                href={href}
                                variant="secondary"
                                size="lg"
                                className="w-full"
                            >
                                {name}
                            </ButtonLink>
                        ))
                    }
                </div>
            </div>
        </MainAdmin>
    );
}
