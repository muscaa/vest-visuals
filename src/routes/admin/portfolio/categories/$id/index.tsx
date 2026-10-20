import { m } from "@shared/paraglide/messages";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { IconPlus } from "@tabler/icons-react";
import type { PortfolioGroup } from "@/components/admin/demo";
import { portfolioCategories, portfolioGroups } from "@/components/admin/demo";
import { DataTable, createDataColumns } from "@/components/data-table";
import { FormDialog, RowActions, RowLink } from "@/components/form-dialog";
import { Img } from "@/components/img";
import { DashboardPage } from "@/components/layout/sidebar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
        header: () => m.admin_portfolio_description_label(),
        cell: ({ row }) => <span className="font-medium">{row.original.description}</span>,
    }),
    column.accessor((group) => group.location ?? "", {
        id: "location",
        header: () => m.admin_portfolio_location(),
        cell: ({ row }) => <span className="text-muted-foreground">{row.original.location}</span>,
    }),
    column.accessor("updatedAt", {
        header: () => m.dashboard_updated(),
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

export const Route = createFileRoute("/admin/portfolio/categories/$id/")({
    staticData: {
        breadcrumbs: (data: { category: { tag: string } }) => [
            { label: m.common_portfolio() },
            { label: m.account_portfolio_categories(), link: { to: "/admin/portfolio/categories" } },
            { label: data.category.tag },
        ],
    },
    // TODO: load the category and its groups, in their saved order, from the backend
    loader: ({ params }) => {
        const category = portfolioCategories.find((value) => value.id === params.id);
        if (!category) throw notFound();

        return { category, groups: portfolioGroups.filter((group) => group.categoryId === category.id) };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { category, groups } = Route.useLoaderData();

    return (
        <DashboardPage
            title={category.tag}
            description={m.admin_portfolio_category_contents()}
        >
            <DataTable
                key={category.id}
                data={groups}
                columns={columns}
                // TODO: save the new order once the backend is there
                reorder={{ getId: (group) => group.id }}
                actions={
                    <FormDialog
                        trigger={
                            <>
                                <IconPlus data-icon="inline-start" />
                                {m.admin_portfolio_add_group()}
                            </>
                        }
                        title={m.admin_portfolio_add_group()}
                        description={m.admin_portfolio_add_group_description()}
                    >
                        <Field>
                            <FieldLabel htmlFor="group-location">{m.admin_portfolio_location()}</FieldLabel>
                            <Input id="group-location" name="location" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="group-description">{m.admin_portfolio_description_label()}</FieldLabel>
                            <Textarea id="group-description" name="description" rows={3} />
                        </Field>
                    </FormDialog>
                }
            />
        </DashboardPage>
    );
}
