import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AddUserDialog, userColumns, userFilters } from "@/components/admin/users";
import { DataTable } from "@/components/data-table";
import { DashboardPage } from "@/components/layout/sidebar";
import { usersQuery } from "@/functions/admin";

export const Route = createFileRoute("/admin/users/")({
    staticData: {
        breadcrumbs: () => [{ label: m.account_users() }],
    },
    loader: ({ context }) => context.queryClient.query(usersQuery),
    component: RouteComponent,
});

function RouteComponent() {
    const { data: users } = useSuspenseQuery(usersQuery);

    return (
        <DashboardPage title={m.account_users()} description={m.admin_users_description()}>
            <DataTable data={users} columns={userColumns} filters={userFilters} actions={<AddUserDialog />} />
        </DashboardPage>
    );
}
