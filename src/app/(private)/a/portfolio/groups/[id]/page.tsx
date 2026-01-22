"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { useParams } from "next/navigation";
import { usePortfolioGroups } from "@/hooks/portfolio/usePortfolioGroups";
import { PortfolioMediaList } from "@/components/lists/portfolio/portfolio-media";
import {
    Loading,
    NotFound,
} from "@/components/status";
import { A_PORTFOLIO_GROUPS } from "@shared/paths";

export default function Page() {
    const params = useParams<{ id: string }>();
    const { usePortfolioGroup } = usePortfolioGroups();
    const { data } = usePortfolioGroup(params.id);

    return (
        <MainSidebarProvider
            breadcrumbs={{
                path: [
                    {
                        href: A_PORTFOLIO_GROUPS,
                        text: "Portfolio Groups",
                    }
                ],
                page: params.id,
            }}
            extraClassName="overflow-hidden"
        >
            {
                data && (
                    <PortfolioMediaList
                        data={data.portfolioMedia}
                        parent={data}
                    />
                ) || data === null && (
                    <NotFound />
                ) || (
                    <Loading />
                )
            }
        </MainSidebarProvider>
    );
}
