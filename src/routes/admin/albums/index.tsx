import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { IconPlus } from "@tabler/icons-react";
import type { Album } from "@/components/admin/demo";
import { DataTable, SortableHeader, createDataColumns } from "@/components/data-table";
import { albums } from "@/components/admin/demo";
import { FormDialog, RowActions, RowLink } from "@/components/form-dialog";
import { DatePicker } from "@/components/date-picker";
import { DashboardPage } from "@/components/layout/sidebar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/i18n";

const column = createDataColumns<Album>();

const columns = column.columns([
    column.accessor("title", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.admin_albums_title()} />,
        sortFn: "text",
        cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
    }),
    column.accessor("email", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.common_email()} />,
        sortFn: "text",
        cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span>,
    }),
    column.accessor("lockAt", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.admin_albums_locks()} />,
        sortFn: "alphanumeric",
        cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.lockAt)}</span>,
    }),
    column.accessor("deleteAt", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.admin_albums_deletes()} />,
        sortFn: "alphanumeric",
        cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.deleteAt)}</span>,
    }),
    column.display({
        id: "actions",
        cell: ({ row }) => (
            <div className="flex justify-end items-center gap-1">
                <RowLink label={m.admin_albums_open()} to="/admin/albums/$id" params={{ id: row.original.id }} />
                <RowActions />
            </div>
        ),
    }),
]);

export const Route = createFileRoute("/admin/albums/")({
    staticData: {
        breadcrumbs: () => [{ label: m.account_albums() }],
    },
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <DashboardPage title={m.account_albums()} description={m.admin_albums_description()}>
            <DataTable
                // TODO: replace with the albums from the backend
                data={albums}
                columns={columns}
                actions={
                    <FormDialog
                        trigger={
                            <>
                                <IconPlus data-icon="inline-start" />
                                {m.admin_albums_new()}
                            </>
                        }
                        title={m.admin_albums_new()}
                        description={m.admin_albums_add_description()}
                    >
                        <Field>
                            <FieldLabel htmlFor="album-title">{m.admin_albums_title()}</FieldLabel>
                            <Input id="album-title" name="title" required />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="album-email">{m.admin_albums_client_email()}</FieldLabel>
                            <Input id="album-email" name="email" type="email" placeholder={m.common_email_placeholder()} required />
                        </Field>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="album-lock">{m.admin_albums_locks()}</FieldLabel>
                                <DatePicker id="album-lock" name="lockAt" required />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="album-delete">{m.admin_albums_deletes()}</FieldLabel>
                                <DatePicker id="album-delete" name="deleteAt" required />
                            </Field>
                        </div>
                    </FormDialog>
                }
            />
        </DashboardPage>
    );
}
