import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UploadAssetDialog, assetColumns, assetFilters } from "@/components/admin/assets";
import { DataTable } from "@/components/data-table";
import { DashboardPage } from "@/components/layout/sidebar";
import { assetsQuery } from "@/functions/assets";
import { useLiveRefresh } from "@/hooks/events";

export const Route = createFileRoute("/admin/assets/")({
    staticData: {
        breadcrumbs: () => [{ label: m.account_assets() }],
    },
    loader: ({ context }) => context.queryClient.query(assetsQuery),
    component: RouteComponent,
});

function RouteComponent() {
    const { data: assets } = useSuspenseQuery(assetsQuery);
    // uploads are processed in the background; the table follows them as they go
    useLiveRefresh("assets", assetsQuery.queryKey);

    return (
        <DashboardPage title={m.account_assets()} description={m.admin_assets_description()}>
            <DataTable data={assets} columns={assetColumns} filters={assetFilters} actions={<UploadAssetDialog />} />
        </DashboardPage>
    );
}
