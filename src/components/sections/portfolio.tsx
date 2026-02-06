"use client";

import { cn } from "@shared/shadcn/lib/utils";
import { PortfolioCategory } from "@type/registries/portfolio-categories";
import { PortfolioCategoryLink } from "../portfolio-category-link";
import { Reveal } from "../animations/reveal";

export interface SectionPortfolioProps {
    title: string;
    categories: PortfolioCategory[];
    className?: string;
}

export function SectionPortfolio(props: SectionPortfolioProps) {
    return (
        <section
            id="portfolio"
            className={cn("flex flex-col justify-center items-center gap-8 p-8 w-full", props.className)}
        >
            <h2 className="font-mono text-center my-8">{props.title}</h2>
            <div className="flex flex-wrap justify-center items-center w-full gap-2">
                {
                    props.categories.map((category, index) => (
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
        </section>
    );
}
