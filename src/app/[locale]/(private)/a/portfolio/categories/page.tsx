"use client";

import { usePortfolioCategories } from "@/hooks/portfolio/usePortfolioCategories";
import { Loading } from "@/components/status";
import { PortfolioCategoriesList } from "@/components/lists/portfolio/portfolio-categories";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export default function Page() {
    const { useAllPortfolioCategories } = usePortfolioCategories();
    const { data } = useAllPortfolioCategories();

    useBreadcrumbs([
        "Portfolio Categories",
    ]);

    return (
        data && (
            <PortfolioCategoriesList
                data={data}
            />
        ) || (
            <Loading />
        )
    );
}
