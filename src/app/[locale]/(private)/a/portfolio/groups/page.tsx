"use client";

import { usePortfolioGroups } from "@/hooks/portfolio/usePortfolioGroups";
import { Loading } from "@/components/status";
import { PortfolioGroupsList } from "@/components/lists/portfolio/portfolio-groups";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export default function Page() {
    const { useAllPortfolioGroups } = usePortfolioGroups();
    const { data } = useAllPortfolioGroups();

    useBreadcrumbs([
        "Portfolio Groups",
    ]);

    return (
        data && (
            <PortfolioGroupsList
                data={data}
            />
        ) || (
            <Loading />
        )
    );
}
