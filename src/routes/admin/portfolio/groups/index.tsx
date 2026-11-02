import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { portfolioGroupColumns } from "@/components/admin/portfolio-groups";
import { DataTable } from "@/components/data-table";
import { DashboardPage } from "@/components/layout/sidebar";
import { portfolioGroupsQuery } from "@/functions/portfolio-groups";
import { useLiveRefresh } from "@/hooks/events";

const columns = portfolioGroupColumns({});

export const Route = createFileRoute("/admin/portfolio/groups/")({
    staticData: {
        breadcrumbs: () => [{ label: m.common_portfolio() }, { label: m.account_portfolio_groups() }],
    },
    loader: ({ context }) => context.queryClient.query(portfolioGroupsQuery),
    component: RouteComponent,
});

/** Every group, from every category. New groups are added from their category's page. */
function RouteComponent() {
    const { data: groups } = useSuspenseQuery(portfolioGroupsQuery);
    useLiveRefresh("portfolio", ["admin", "portfolio"]);

    return (
        <DashboardPage title={m.account_portfolio_groups()} description={m.admin_portfolio_groups_description()}>
            <DataTable data={groups} columns={columns} />
        </DashboardPage>
    );
}
