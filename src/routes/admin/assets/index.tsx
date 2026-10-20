import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { IconUpload } from "@tabler/icons-react";
import type { MediaVariant } from "@/components/admin/media";
import { DataTable, SortableHeader, createDataColumns } from "@/components/data-table";
import { FormDialog, RowActions } from "@/components/form-dialog";
import { MediaPreview, MediaVariants } from "@/components/admin/media";
import { DashboardPage } from "@/components/layout/sidebar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/i18n";

interface Asset {
    id: string;
    /** the first one is the preview */
    variants: MediaVariant[];
    /** ISO date */
    createdAt: string;
}

const cdn = (id: string): MediaVariant[] => [
    { tag: "medium", url: `https://cdn0.vestvisuals.ro/assets/${id}/medium` },
    { tag: "large", url: `https://cdn0.vestvisuals.ro/assets/${id}/large` },
];

// TODO: replace with the assets from the backend
const assets: Asset[] = [
    { id: "xsxzhzldm3y0px8t1md9xc2w", variants: cdn("xsxzhzldm3y0px8t1md9xc2w"), createdAt: "2026-04-21" },
    { id: "mw9i6zen7sd4tlxyl6d34c8o", variants: cdn("mw9i6zen7sd4tlxyl6d34c8o"), createdAt: "2026-04-21" },
    { id: "yneoo6rvga4s61g1wilygf77", variants: cdn("yneoo6rvga4s61g1wilygf77"), createdAt: "2026-05-02" },
];

const column = createDataColumns<Asset>();

const columns = column.columns([
    column.display({
        id: "preview",
        header: () => m.admin_preview(),
        cell: ({ row }) => <MediaPreview variants={row.original.variants} alt={row.original.id} />,
    }),
    column.accessor("id", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.admin_id()} />,
        sortFn: "alphanumeric",
        cell: ({ row }) => <span className="font-mono text-sm-2">{row.original.id}</span>,
    }),
    column.display({
        id: "variants",
        header: () => m.dashboard_variants(),
        cell: ({ row }) => <MediaVariants variants={row.original.variants} />,
    }),
    column.accessor("createdAt", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.dashboard_created()} />,
        sortFn: "alphanumeric",
        cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.createdAt)}</span>,
    }),
    column.display({
        id: "actions",
        cell: () => <RowActions />,
    }),
]);

export const Route = createFileRoute("/admin/assets/")({
    staticData: {
        breadcrumbs: () => [{ label: m.account_assets() }],
    },
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <DashboardPage title={m.account_assets()} description={m.admin_assets_description()}>
            <DataTable
                data={assets}
                columns={columns}
                actions={
                    <FormDialog
                        trigger={
                            <>
                                <IconUpload data-icon="inline-start" />
                                {m.dashboard_upload()}
                            </>
                        }
                        title={m.dashboard_upload()}
                        submit={m.dashboard_upload()}
                    >
                        <Field>
                            <FieldLabel htmlFor="asset-files">{m.admin_files()}</FieldLabel>
                            <Input id="asset-files" name="files" type="file" accept="image/*,video/*" multiple required />
                        </Field>
                    </FormDialog>
                }
            />
        </DashboardPage>
    );
}
