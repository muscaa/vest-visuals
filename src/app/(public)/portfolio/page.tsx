"use client";

import { Main } from "@/components/main";
import Image from "next/image";
import Link from "next/link";
import * as config from "@/config/public";
import { Category } from "@/shared/config";
import { Reveal } from "@/components/animations/reveal";

interface CategoryLinkProps {
    category: Category;
    index: number;
}

function CategoryLink(props: CategoryLinkProps) {
    return (
        <Reveal delay={props.index * 100} className="flex w-full h-40 max-w-128">
            <Link
                href={props.category.portfolioUrl}
                className="
                    relative rounded-xl shadow-sm overflow-hidden
                    w-full h-full group
                "
            >
                <div className="absolute size-full overflow-hidden">
                    <Image
                        src={props.category.coverImage.src}
                        alt={props.category.coverImage.alt}
                        width={props.category.coverImage.w}
                        height={props.category.coverImage.h}
                        className="
                            size-full object-cover object-center transition-all ease-out
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
                    <h2>{props.category.name.toUpperCase()}</h2>
                </div>
            </Link>
        </Reveal>
    );
}

export default function Page() {
    return (
        <Main>
            <div className="flex justify-center items-center size-full p-2">
                <div className="flex flex-wrap justify-center items-center w-full gap-2">
                    {
                        config.categories.map((category, index) => (
                            <CategoryLink
                                key={index}
                                category={category}
                                index={index}
                            />
                        ))
                    }
                </div>
            </div>
        </Main>
    );
}
