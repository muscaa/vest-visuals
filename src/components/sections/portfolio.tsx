"use client";

import { cn } from "@shared/shadcn/lib/utils";
import { PortfolioCategory } from "@type/registries/portfolio-categories";
import { Reveal2 } from "../animations/reveal2";
import { Img } from "../snippets";
import { Link } from "@shared/i18n";

interface PortfolioCategoryLinkProps {
    ref: React.Ref<any>;
    category: PortfolioCategory;
    href?: string;
    className?: string;
}

function PortfolioCategoryLink(props: PortfolioCategoryLinkProps) {
    return (
        <Link
            href={props.href ?? props.category.href}
            className="
                relative overflow-hidden group
                w-full h-40 sm:h-60 lg:h-80
            "
        >
            <div className="absolute size-full overflow-hidden">
                <Img
                    src={props.category.cover}
                    alt="Category Cover"
                    className="
                        size-full object-cover object-center transition-all ease-out
                        group-hover:scale-105
                    "
                />
            </div>
            <div
                className="
                    absolute size-full flex flex-col p-2
                    justify-center items-center text-center theme-dark
                "
            >
                <h2 className="font-mono text-shadow-lg text-shadow-black/30">{props.category.name.toUpperCase()}</h2>
            </div>
        </Link>
    );
}

export interface SectionPortfolioProps {
    title: string;
    categories: PortfolioCategory[];
    className?: string;
}

export function SectionPortfolio(props: SectionPortfolioProps) {
    return (
        <section
            id="portfolio"
            className={cn("flex flex-col justify-center items-center gap-8 w-full", props.className)}
        >
            <h2 className="font-mono text-center my-8">{props.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                {
                    props.categories.map((category, index) => (
                        <Reveal2
                            key={index}
                            delay={index * 100}
                            render={(props) => (
                                <PortfolioCategoryLink
                                    ref={props.ref}
                                    category={category}
                                    className={props.className}
                                />
                            )}
                        />
                    ))
                }
            </div>
        </section>
    );
}
