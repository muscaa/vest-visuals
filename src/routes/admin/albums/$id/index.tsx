import { m } from "@shared/paraglide/messages";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { IconUpload } from "@tabler/icons-react";
import type { AlbumMedia } from "@/components/admin/demo";
import { albumMedia, albums } from "@/components/admin/demo";
import { mediaColumns } from "@/components/admin/media";
import { DataTable } from "@/components/data-table";
import { FormDialog } from "@/components/form-dialog";
import { DashboardPage } from "@/components/layout/sidebar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const columns = mediaColumns<AlbumMedia>({ sortable: false });

export const Route = createFileRoute("/admin/albums/$id/")({
    staticData: {
        breadcrumbs: (data: { album: { title: string } }) => [
            { label: m.account_albums(), link: { to: "/admin/albums" } },
            { label: data.album.title },
        ],
    },
    // TODO: load the album and its files, in their saved order, from the backend
    loader: ({ params }) => {
        const album = albums.find((value) => value.id === params.id);
        if (!album) throw notFound();

        return { album, media: albumMedia.filter((item) => item.albumId === album.id) };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { album, media } = Route.useLoaderData();

    return (
        <DashboardPage
            title={album.title}
            description={m.admin_albums_contents({ email: album.email })}
        >
            <DataTable
                key={album.id}
                data={media}
                columns={columns}
                // TODO: save the new order once the backend is there
                reorder={{ getId: (item) => item.id }}
                actions={
                    <FormDialog
                        trigger={
                            <>
                                <IconUpload data-icon="inline-start" />
                                {m.dashboard_upload()}
                            </>
                        }
                        title={m.dashboard_upload()}
                        description={m.admin_albums_upload_description()}
                        submit={m.dashboard_upload()}
                    >
                        <Field>
                            <FieldLabel htmlFor="album-files">{m.admin_files()}</FieldLabel>
                            <Input id="album-files" name="files" type="file" accept="image/*,video/*" multiple required />
                        </Field>
                    </FormDialog>
                }
            />
        </DashboardPage>
    );
}
