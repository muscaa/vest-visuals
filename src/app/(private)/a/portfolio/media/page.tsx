"use client";

import { usePortfolioMedia } from "@/hooks/portfolio/usePortfolioMedia";
import { Loading } from "@/components/status";
import { PortfolioMediaList } from "@/components/lists/portfolio/portfolio-media";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export default function Page() {
    const { useAllPortfolioMedia } = usePortfolioMedia();
    const { data } = useAllPortfolioMedia();

    useBreadcrumbs([
        "Portfolio Media",
    ]);

    return (
        data && (
            <PortfolioMediaList
                data={data}
            />
        ) || (
            <Loading />
        )
    );
}
