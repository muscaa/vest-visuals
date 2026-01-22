"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { usePortfolioMedia } from "@/hooks/portfolio/usePortfolioMedia";
import { Loading } from "@/components/status";
import { PortfolioMediaList } from "@/components/lists/portfolio/portfolio-media";

export default function Page() {
    const { useAllPortfolioMedia } = usePortfolioMedia();
    const { data } = useAllPortfolioMedia();

    return (
        <MainSidebarProvider
            breadcrumbs={{
                page: "Media Contents",
            }}
            extraClassName="overflow-hidden"
        >
            {
                data && (
                    <PortfolioMediaList
                        data={data}
                    />
                ) || (
                    <Loading />
                )
            }
        </MainSidebarProvider>
    );
}
