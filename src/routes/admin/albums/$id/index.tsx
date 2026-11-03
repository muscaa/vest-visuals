import { m } from "@shared/paraglide/messages";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Fragment, useMemo } from "react";
import { z } from "zod";
import { AddEntryDialog, albumEntryColumns } from "@/components/admin/album-entries";
import { AlbumPageMenu, AlbumToolbar } from "@/components/admin/albums";
import { DataTable } from "@/components/data-table";
import { DashboardPage } from "@/components/layout/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { adminAlbumQuery, reorderAlbumEntries } from "@/functions/albums-admin";
import { useLiveRefresh } from "@/hooks/events";

export const Route = createFileRoute("/admin/albums/$id/")({
    /** the directory open, by id; the album's root without it */
    validateSearch: z.object({ directory: z.uuid().optional() }),
    loaderDeps: ({ search }) => ({ directory: search.directory }),
    staticData: {
        breadcrumbs: (data: { album: { title: string } }) => [
            { label: m.account_albums(), link: { to: "/admin/albums" } },
            { label: data.album.title },
        ],
    },
    loader: ({ context, params, deps }) => context.queryClient.query(adminAlbumQuery(params.id, deps.directory)),
    component: RouteComponent,
});

/** The way from the album's root down to the open directory. */
function DirectoryPath(props: { albumId: string; title: string; path: { id: string; name: string }[] }) {
    if (!props.path.length) return null;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink render={<Link to="/admin/albums/$id" params={{ id: props.albumId }} />}>{props.title}</BreadcrumbLink>
                </BreadcrumbItem>
                {
                    props.path.map((step, index) => (
                        <Fragment key={step.id}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {
                                    index === props.path.length - 1
                                        ? <BreadcrumbPage>{step.name}</BreadcrumbPage>
                                        : <BreadcrumbLink render={<Link to="/admin/albums/$id" params={{ id: props.albumId }} search={{ directory: step.id }} />}>{step.name}</BreadcrumbLink>
                                }
                            </BreadcrumbItem>
                        </Fragment>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    );
}

/** An album, at one of its directories: its status, zip and link above, its entries in order below, dragging saves it. */
function RouteComponent() {
    const { id } = Route.useParams();
    const { directory } = Route.useSearch();
    const { data: { album, path, entries } } = useSuspenseQuery(adminAlbumQuery(id, directory));
    const columns = useMemo(() => albumEntryColumns({ albumId: id, coverId: album.coverEntryId }), [id, album.coverEntryId]);
    const parentId = directory ?? null;
    useLiveRefresh("albums", ["admin", "albums"]);

    return (
        <DashboardPage title={path.at(-1)?.name ?? album.title} description={album.email ?? m.admin_albums_no_client()}>
            <div className="flex flex-col gap-4">
                <DirectoryPath albumId={id} title={album.title} path={path} />
                <DataTable
                    data={entries}
                    columns={columns}
                    reorder={{
                        getId: (entry) => entry.id,
                        onReorder: (rows) => void reorderAlbumEntries({ data: { albumId: id, parentId, entryIds: rows.map((entry) => entry.id) } }),
                    }}
                    nextToSearch={<AlbumPageMenu album={album} />}
                    actions={
                        <>
                            <AlbumToolbar album={album} />
                            <AddEntryDialog albumId={id} parentId={parentId} />
                        </>
                    }
                />
            </div>
        </DashboardPage>
    );
}
