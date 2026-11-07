import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { NewAlbumDialog, albumColumns, albumFilters } from "@/components/admin/albums";
import { DataTable } from "@/components/data-table";
import { DashboardPage } from "@/components/layout/sidebar";
import { adminAlbumsQuery } from "@/functions/albums-admin";
import { useLiveRefresh } from "@/hooks/events";

export const Route = createFileRoute("/admin/albums/")({
    staticData: {
        breadcrumbs: () => [{ label: m.account_albums() }],
    },
    loader: ({ context }) => context.queryClient.query(adminAlbumsQuery),
    component: RouteComponent,
});

function RouteComponent() {
    const { data: albums } = useSuspenseQuery(adminAlbumsQuery);
    useLiveRefresh("albums", ["admin", "albums"]);

    return (
        <DashboardPage title={m.account_albums()} description={m.admin_albums_description()}>
            <DataTable data={albums} columns={albumColumns} filters={albumFilters} actions={<NewAlbumDialog />} />
        </DashboardPage>
    );
}
