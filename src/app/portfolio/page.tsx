"use client";

import { Main } from "@/components/main";
import Image from "next/image";
import Link from "next/link";
import * as config from "@/config/public";

export default function Page() {
    return (
        <Main>
            <div className="flex justify-center items-center size-full p-2">
                <div className="flex flex-wrap justify-center items-center w-full gap-2">
                    {
                        config.categories.map((category, index) => (
                            <Link
                                key={index}
                                href={category.portfolioUrl}
                                className="
                                    relative rounded-xl overflow-hidden
                                    w-full h-40 max-w-128 group
                                "
                            >
                                <div className="absolute size-full overflow-hidden">
                                    <Image
                                        src={category.coverImage.src}
                                        alt={category.coverImage.alt}
                                        width={category.coverImage.w}
                                        height={category.coverImage.h}
                                        className="
                                            size-full object-cover object-center transition-all
                                            not-group-hover:opacity-75 contrast-50 not-group-hover:saturate-0 group-hover:scale-105
                                        "
                                    />
                                </div>
                                <div
                                    className="
                                        absolute size-full flex flex-col p-2
                                        justify-center items-center text-center theme-dark
                                    "
                                >
                                    <h2>{category.name.toUpperCase()}</h2>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </Main>
    );
}
