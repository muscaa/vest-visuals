"use client";

import { useParams } from "next/navigation";
import { usePortfolioCategories } from "@/hooks/portfolio/usePortfolioCategories";
import { PortfolioGroupsList } from "@/components/lists/portfolio/portfolio-groups";
import {
    Loading,
    NotFound,
} from "@/components/status";
import { A_PORTFOLIO_CATEGORIES } from "@shared/i18n";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export default function Page() {
    const params = useParams<{ id: string }>();
    const { usePortfolioCategory } = usePortfolioCategories();
    const { data } = usePortfolioCategory(params.id);

    useBreadcrumbs([
        ["Portfolio Categories", A_PORTFOLIO_CATEGORIES()],
        params.id,
    ]);

    return (
        data && (
            <PortfolioGroupsList
                data={data.portfolioGroups}
                parent={data}
            />
        ) || data === null && (
            <NotFound />
        ) || (
            <Loading />
        )
    );
}
