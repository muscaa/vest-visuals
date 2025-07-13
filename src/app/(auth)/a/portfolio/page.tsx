"use client";

import { Main } from "@/components/main";
import * as config from "@/config/public";
import { Reveal } from "@/components/animations/reveal";
import { CategoryLink } from "@/components/category-link";

export default function Page() {
    return (
        <Main>
            <div className="flex justify-center items-center size-full p-2">
                <div className="flex flex-wrap justify-center items-center w-full gap-2">
                    {
                        config.categories.map((category, index) => (
                            <Reveal
                                key={index}
                                delay={index * 100}
                                className="flex w-full max-w-128"
                            >
                                <CategoryLink
                                    category={category}
                                />
                            </Reveal>
                        ))
                    }
                </div>
            </div>
        </Main>
    );
}
