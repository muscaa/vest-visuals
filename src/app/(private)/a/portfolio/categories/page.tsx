"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { usePortfolioCategories } from "@/hooks/portfolio/usePortfolioCategories";
import { Loading } from "@/components/status";
import { PortfolioCategoriesList } from "@/components/lists/portfolio/portfolio-categories";

export default function Page() {
    const { useAllPortfolioCategories } = usePortfolioCategories();
    const { data } = useAllPortfolioCategories();

    return (
        <MainSidebarProvider
            breadcrumbs={{
                page: "Media Categories",
            }}
            extraClassName="overflow-hidden"
        >
            {
                data && (
                    <PortfolioCategoriesList
                        data={data}
                    />
                ) || (
                    <Loading />
                )
            }
        </MainSidebarProvider>
    );
}
