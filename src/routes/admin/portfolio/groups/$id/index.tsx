import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { groupName } from "@/components/admin/portfolio-groups";
import { AddMediaDialog, portfolioMediaColumns } from "@/components/admin/portfolio-media";
import { DataTable } from "@/components/data-table";
import { DashboardPage } from "@/components/layout/sidebar";
import { portfolioGroupQuery, reorderPortfolioGroup } from "@/functions/portfolio-groups";
import { useLiveRefresh } from "@/hooks/events";

export const Route = createFileRoute("/admin/portfolio/groups/$id/")({
    staticData: {
        breadcrumbs: (data: { group: { id: string; description: string | null; location: string | null } }) => [
            { label: m.common_portfolio() },
            { label: m.account_portfolio_groups(), link: { to: "/admin/portfolio/groups" } },
            { label: groupName(data.group) },
        ],
    },
    loader: ({ context, params }) => context.queryClient.query(portfolioGroupQuery(params.id)),
    component: RouteComponent,
});

/** A group's photos and videos, in the order the site shows them; dragging saves the new order. */
function RouteComponent() {
    const { id } = Route.useParams();
    const { data: { group, media } } = useSuspenseQuery(portfolioGroupQuery(id));
    const columns = useMemo(() => portfolioMediaColumns({ groupId: id }), [id]);
    useLiveRefresh("portfolio", ["admin", "portfolio"]);

    return (
        <DashboardPage title={groupName(group)} description={m.admin_portfolio_group_contents()}>
            <DataTable
                data={media}
                columns={columns}
                reorder={{
                    getId: (item) => item.id,
                    onReorder: (rows) => void reorderPortfolioGroup({ data: { id, mediaIds: rows.map((item) => item.id) } }),
                }}
                actions={<AddMediaDialog groupId={id} inGroup={media.map((item) => item.id)} />}
            />
        </DashboardPage>
    );
}
