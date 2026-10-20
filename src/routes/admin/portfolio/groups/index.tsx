import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import type { PortfolioGroup } from "@/components/admin/demo";
import { portfolioGroups } from "@/components/admin/demo";
import { DataTable, SortableHeader, createDataColumns } from "@/components/data-table";
import { RowActions, RowLink } from "@/components/form-dialog";
import { Img } from "@/components/img";
import { DashboardPage } from "@/components/layout/sidebar";
import { formatDate } from "@/i18n";

const column = createDataColumns<PortfolioGroup>();

const columns = column.columns([
    column.display({
        id: "cover",
        header: () => m.admin_preview(),
        cell: ({ row }) => (
            <Img src={row.original.cover} alt={row.original.description ?? row.original.id} loading="lazy" className="size-20 rounded-xl object-cover" />
        ),
    }),
    column.accessor((group) => group.description ?? "", {
        id: "description",
        header: ({ column: header }) => <SortableHeader column={header} title={m.admin_portfolio_description_label()} />,
        sortFn: "text",
        cell: ({ row }) => <span className="font-medium">{row.original.description}</span>,
    }),
    column.accessor((group) => group.location ?? "", {
        id: "location",
        header: ({ column: header }) => <SortableHeader column={header} title={m.admin_portfolio_location()} />,
        sortFn: "text",
        cell: ({ row }) => <span className="text-muted-foreground">{row.original.location}</span>,
    }),
    column.accessor("updatedAt", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.dashboard_updated()} />,
        sortFn: "alphanumeric",
        cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.updatedAt)}</span>,
    }),
    column.display({
        id: "actions",
        cell: ({ row }) => (
            <div className="flex justify-end items-center gap-1">
                <RowLink label={m.admin_portfolio_open_group()} to="/admin/portfolio/groups/$id" params={{ id: row.original.id }} />
                <RowActions />
            </div>
        ),
    }),
]);

export const Route = createFileRoute("/admin/portfolio/groups/")({
    staticData: {
        breadcrumbs: () => [{ label: m.common_portfolio() }, { label: m.account_portfolio_groups() }],
    },
    component: RouteComponent,
});

/** Every group, from every category. New groups are added from their category's page. */
function RouteComponent() {
    return (
        <DashboardPage title={m.account_portfolio_groups()} description={m.admin_portfolio_groups_description()}>
            {/* TODO: replace with the groups from the backend */}
            <DataTable data={portfolioGroups} columns={columns} />
        </DashboardPage>
    );
}
