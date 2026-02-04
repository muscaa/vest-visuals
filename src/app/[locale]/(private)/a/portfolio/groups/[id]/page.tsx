"use client";

import { useParams } from "next/navigation";
import { usePortfolioGroups } from "@/hooks/portfolio/usePortfolioGroups";
import { PortfolioMediaList } from "@/components/lists/portfolio/portfolio-media";
import {
    Loading,
    NotFound,
} from "@/components/status";
import { A_PORTFOLIO_GROUPS } from "@shared/paths";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export default function Page() {
    const params = useParams<{ id: string }>();
    const { usePortfolioGroup } = usePortfolioGroups();
    const { data } = usePortfolioGroup(params.id);

    useBreadcrumbs([
        ["Portfolio Groups", A_PORTFOLIO_GROUPS],
        params.id,
    ]);

    return (
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
    );
}
