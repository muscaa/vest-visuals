import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AddCategoryDialog, portfolioCategoryColumns } from "@/components/admin/portfolio-categories";
import { DataTable } from "@/components/data-table";
import { DashboardPage } from "@/components/layout/sidebar";
import { portfolioCategoriesQuery } from "@/functions/portfolio-categories";
import { useLiveRefresh } from "@/hooks/events";

export const Route = createFileRoute("/admin/portfolio/categories/")({
    staticData: {
        breadcrumbs: () => [{ label: m.common_portfolio() }, { label: m.account_portfolio_categories() }],
    },
    loader: ({ context }) => context.queryClient.query(portfolioCategoriesQuery),
    component: RouteComponent,
});

function RouteComponent() {
    const { data: categories } = useSuspenseQuery(portfolioCategoriesQuery);
    useLiveRefresh("portfolio", ["admin", "portfolio"]);

    return (
        <DashboardPage title={m.account_portfolio_categories()} description={m.admin_portfolio_categories_description()}>
            <DataTable data={categories} columns={portfolioCategoryColumns} actions={<AddCategoryDialog />} />
        </DashboardPage>
    );
}
