import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { AddGroupDialog, portfolioGroupColumns } from "@/components/admin/portfolio-groups";
import { DataTable } from "@/components/data-table";
import { DashboardPage } from "@/components/layout/sidebar";
import { portfolioCategoryQuery, reorderPortfolioCategory } from "@/functions/portfolio-categories";
import { useLiveRefresh } from "@/hooks/events";

export const Route = createFileRoute("/admin/portfolio/categories/$key/")({
    staticData: {
        breadcrumbs: (data: { category: { key: string } }) => [
            { label: m.common_portfolio() },
            { label: m.account_portfolio_categories(), link: { to: "/admin/portfolio/categories" } },
            { label: data.category.key },
        ],
    },
    loader: ({ context, params }) => context.queryClient.query(portfolioCategoryQuery(params.key)),
    component: RouteComponent,
});

/** A category's groups, in the order the site shows them; dragging saves the new order. */
function RouteComponent() {
    const { key } = Route.useParams();
    const { data: { category, groups } } = useSuspenseQuery(portfolioCategoryQuery(key));
    const columns = useMemo(() => portfolioGroupColumns({ categoryKey: key }), [key]);
    useLiveRefresh("portfolio", ["admin", "portfolio"]);

    return (
        <DashboardPage title={category.key} description={m.admin_portfolio_category_contents()}>
            <DataTable
                data={groups}
                columns={columns}
                reorder={{
                    getId: (group) => group.id,
                    onReorder: (rows) => void reorderPortfolioCategory({ data: { key, groupIds: rows.map((group) => group.id) } }),
                }}
                actions={<AddGroupDialog categoryKey={key} inCategory={groups.map((group) => group.id)} />}
            />
        </DashboardPage>
    );
}
