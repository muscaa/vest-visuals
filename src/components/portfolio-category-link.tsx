import { PortfolioCategory } from "@type/registries/portfolio-categories";
import { Img } from "./snippets";
import { Link } from "@shared/i18n";

interface PortfolioCategoryLinkProps {
    category: PortfolioCategory;
    href?: string;
}

export function PortfolioCategoryLink(props: PortfolioCategoryLinkProps) {
    return (
        <Link
            href={props.href ?? props.category.href}
            className="
                relative shadow-sm overflow-hidden
                w-full h-40 max-w-128 group cut-corners-10
            "
        >
            <div className="absolute size-full overflow-hidden">
                <Img
                    src={props.category.cover}
                    alt="Category Cover"
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
    );
}
