"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { useParams } from "next/navigation";
import { usePortfolioCategories } from "@/hooks/portfolio/usePortfolioCategories";
import { PortfolioGroupsList } from "@/components/lists/portfolio/portfolio-groups";
import {
    Loading,
    NotFound,
} from "@/components/status";

export default function Page() {
    const params = useParams<{ id: string }>();
    const { usePortfolioCategory } = usePortfolioCategories();
    const { data } = usePortfolioCategory(params.id);

    return (
        <MainSidebarProvider
            breadcrumbs={{
                path: [
                    {
                        href: "/a/media/categories",
                        text: "Media Categories",
                    }
                ],
                page: params.id,
            }}
            extraClassName="overflow-hidden"
        >
            {
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
            }
        </MainSidebarProvider >
    );
}
