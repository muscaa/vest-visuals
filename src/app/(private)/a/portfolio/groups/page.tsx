"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { usePortfolioGroups } from "@/hooks/portfolio/usePortfolioGroups";
import { Loading } from "@/components/status";
import { PortfolioGroupsList } from "@/components/lists/portfolio/portfolio-groups";

export default function Page() {
    const { useAllPortfolioGroups } = usePortfolioGroups();
    const { data } = useAllPortfolioGroups();

    return (
        <MainSidebarProvider
            breadcrumbs={{
                page: "Media Groups",
            }}
            extraClassName="overflow-hidden"
        >
            {
                data && (
                    <PortfolioGroupsList
                        data={data}
                    />
                ) || (
                    <Loading />
                )
            }
        </MainSidebarProvider>
    );
}
