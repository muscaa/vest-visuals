"use client";

import { Main } from "@/components/main";
import { Reveal } from "@/components/animations/reveal";
import { useRegistries } from "@/hooks/useRegistries";
import { PortfolioCategoryLink } from "@/components/portfolio-category-link";

export default function Page() {
    const { useRegistry } = useRegistries();
    const { data } = useRegistry("portfolio_categories");

    return (
        <Main>
            <div className="flex justify-center items-center size-full p-2">
                <div className="flex flex-wrap justify-center items-center w-full gap-2">
                    {
                        data && data.map((category, index) => (
                            <Reveal
                                key={index}
                                delay={index * 100}
                                className="flex w-full max-w-128"
                            >
                                <PortfolioCategoryLink
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
