import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { portfolioMediaColumns } from "@/components/admin/portfolio-media";
import { DataTable } from "@/components/data-table";
import { DashboardPage } from "@/components/layout/sidebar";
import { portfolioMediaQuery } from "@/functions/portfolio-media";
import { useLiveRefresh } from "@/hooks/events";

const columns = portfolioMediaColumns({});

export const Route = createFileRoute("/admin/portfolio/media/")({
    staticData: {
        breadcrumbs: () => [{ label: m.common_portfolio() }, { label: m.admin_portfolio_media() }],
    },
    loader: ({ context }) => context.queryClient.query(portfolioMediaQuery),
    component: RouteComponent,
});

/** Every photo and video in the portfolio. New ones are uploaded from their group's page. */
function RouteComponent() {
    const { data: media } = useSuspenseQuery(portfolioMediaQuery);
    useLiveRefresh("portfolio", ["admin", "portfolio"]);

    return (
        <DashboardPage title={m.admin_portfolio_media()} description={m.admin_portfolio_media_description()}>
            <DataTable data={media} columns={columns} />
        </DashboardPage>
    );
}
