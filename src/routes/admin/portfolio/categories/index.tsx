import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { IconPlus } from "@tabler/icons-react";
import type { PortfolioCategory } from "@/components/admin/demo";
import { portfolioCategories } from "@/components/admin/demo";
import { DataTable, SortableHeader, createDataColumns } from "@/components/data-table";
import { FormDialog, RowActions, RowLink } from "@/components/form-dialog";
import { DashboardPage } from "@/components/layout/sidebar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/i18n";

const column = createDataColumns<PortfolioCategory>();

const columns = column.columns([
    column.accessor("tag", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.admin_portfolio_tag()} />,
        sortFn: "text",
        cell: ({ row }) => <span className="font-mono">{row.original.tag}</span>,
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
                <RowLink label={m.admin_portfolio_open_category()} to="/admin/portfolio/categories/$id" params={{ id: row.original.id }} />
                <RowActions />
            </div>
        ),
    }),
]);

export const Route = createFileRoute("/admin/portfolio/categories/")({
    staticData: {
        breadcrumbs: () => [{ label: m.common_portfolio() }, { label: m.account_portfolio_categories() }],
    },
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <DashboardPage title={m.account_portfolio_categories()} description={m.admin_portfolio_categories_description()}>
            <DataTable
                // TODO: replace with the categories from the backend
                data={portfolioCategories}
                columns={columns}
                actions={
                    <FormDialog
                        trigger={
                            <>
                                <IconPlus data-icon="inline-start" />
                                {m.admin_portfolio_add_category()}
                            </>
                        }
                        title={m.admin_portfolio_add_category()}
                    >
                        <Field>
                            <FieldLabel htmlFor="category-tag">{m.admin_portfolio_tag()}</FieldLabel>
                            <Input id="category-tag" name="tag" pattern="[a-z0-9-]+" required />
                        </Field>
                    </FormDialog>
                }
            />
        </DashboardPage>
    );
}
