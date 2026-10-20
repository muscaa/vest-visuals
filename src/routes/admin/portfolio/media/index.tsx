import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import type { PortfolioMedia } from "@/components/admin/demo";
import { portfolioMedia } from "@/components/admin/demo";
import { mediaColumns } from "@/components/admin/media";
import { DataTable } from "@/components/data-table";
import { DashboardPage } from "@/components/layout/sidebar";

const columns = mediaColumns<PortfolioMedia>({ sortable: true });

export const Route = createFileRoute("/admin/portfolio/media/")({
    staticData: {
        breadcrumbs: () => [{ label: m.common_portfolio() }, { label: m.admin_portfolio_media() }],
    },
    component: RouteComponent,
});

/** Every photo and video in the portfolio. New ones are uploaded from their group's page. */
function RouteComponent() {
    return (
        <DashboardPage title={m.admin_portfolio_media()} description={m.admin_portfolio_media_description()}>
            {/* TODO: replace with the portfolio media from the backend */}
            <DataTable data={portfolioMedia} columns={columns} />
        </DashboardPage>
    );
}
