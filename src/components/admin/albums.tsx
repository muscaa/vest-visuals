import { m } from "@shared/paraglide/messages";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
    IconAlertTriangle,
    IconCheck,
    IconCopy,
    IconDots,
    IconExternalLink,
    IconFileZip,
    IconLink,
    IconLoader2,
    IconPencil,
    IconPlus,
    IconRefresh,
    IconSend,
    IconTrash,
    IconWritingSign,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { albumDatePresets } from "@shared/albums";
import { SortableHeader, createDataColumns } from "../data-table";
import { DatePicker, dateValue } from "../date-picker";
import { FormDialog, RowLink } from "../form-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { AdminAlbum, getAdminAlbum } from "@/functions/albums-admin";
import { formatDate } from "@/i18n";
import { useFormSubmit } from "@/hooks/form";
import { usePublicUrl } from "@/hooks/auth";
import { renewAlbumLink } from "@/functions/albums";
import { createAlbum, deleteAlbumById, publishAlbumById, syncAlbumArchive, unpublishAlbum, updateAlbum } from "@/functions/albums-admin";

type AlbumDetails = Awaited<ReturnType<typeof getAdminAlbum>>["album"];

/** What the album's menu and dialogs need, from the list's rows or the album's page. */
type AlbumInfo = Pick<AdminAlbum, "id" | "token" | "title" | "description" | "date" | "email" | "status" | "lockAt" | "deleteAt" | "updatedAt">;

/** Reloads every albums page's data after a change; pages left open hear about it live too. */
export function useRefreshAlbums() {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: ["admin", "albums"] });
}

/** Asks before something that can't be undone, or that the client would notice, then reloads and says it's done. */
export function AlbumConfirmDialog(props: {
    title: string;
    description: string;
    submit: string;
    destructive?: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    action: () => Promise<unknown>;
    done: string;
}) {
    const refreshAlbums = useRefreshAlbums();

    const form = useFormSubmit(async () => {
        await props.action();
        props.onOpenChange(false);
        await refreshAlbums();
        toast.success(props.done);
    });

    return (
        <FormDialog
            open={props.open}
            onOpenChange={props.onOpenChange}
            title={props.title}
            description={props.description}
            submit={props.submit}
            destructive={props.destructive}
            form={form}
        />
    );
}

//
// the album's details
//

function DetailsFields(props: { album?: Pick<AlbumInfo, "title" | "description" | "date" | "email"> }) {
    return (
        <>
            <Field>
                <FieldLabel htmlFor="album-title">{m.admin_albums_title()}</FieldLabel>
                <Input id="album-title" name="title" defaultValue={props.album?.title} maxLength={200} required />
            </Field>
            <Field>
                <FieldLabel htmlFor="album-description">{m.admin_portfolio_description_label()}</FieldLabel>
                <Textarea id="album-description" name="description" defaultValue={props.album?.description ?? ""} rows={3} maxLength={2000} />
            </Field>
            <Field>
                <FieldLabel htmlFor="album-date">{m.admin_albums_date()}</FieldLabel>
                <DatePicker id="album-date" name="date" defaultValue={props.album?.date ?? dateValue(new Date())} required />
            </Field>
            <Field>
                <FieldLabel htmlFor="album-email">{m.admin_albums_client_email()}</FieldLabel>
                <Input id="album-email" name="email" type="email" defaultValue={props.album?.email ?? ""} placeholder={m.common_email_placeholder()} />
                <FieldDescription>{m.admin_albums_add_description()}</FieldDescription>
            </Field>
        </>
    );
}

/** A new album, as a draft, added to the list. */
export function NewAlbumDialog() {
    const [open, setOpen] = useState(false);
    const refreshAlbums = useRefreshAlbums();

    const form = useFormSubmit(async (field) => {
        const title = field("title");
        await createAlbum({ data: { title, description: field("description"), date: field("date"), email: field("email") } });
        setOpen(false);
        await refreshAlbums();
        toast.success(m.admin_albums_created({ title }));
    });

    return (
        <FormDialog
            open={open}
            onOpenChange={setOpen}
            trigger={
                <>
                    <IconPlus data-icon="inline-start" />
                    {m.admin_albums_new()}
                </>
            }
            title={m.admin_albums_new()}
            description={m.admin_albums_new_description()}
            form={form}
        >
            <DetailsFields />
        </FormDialog>
    );
}

/** When a published album locks and is deleted, starting from the presets; a button puts them back. */
function DateFields(props: { lockAt?: Date | null; deleteAt?: Date | null }) {
    const presets = albumDatePresets();
    const [lockAt, setLockAt] = useState(dateValue(props.lockAt ?? presets.lockAt));
    const [deleteAt, setDeleteAt] = useState(dateValue(props.deleteAt ?? presets.deleteAt));

    const reset = () => {
        setLockAt(dateValue(presets.lockAt));
        setDeleteAt(dateValue(presets.deleteAt));
    };

    /** a later lock takes the deletion with it, so it's never before the lock */
    const changeLock = (value: string) => {
        setLockAt(value);
        if (deleteAt < value) {
            const day = new Date(`${value}T00:00`);
            day.setDate(day.getDate() + 30);
            setDeleteAt(dateValue(day));
        }
    };

    return (
        <>
            <Field>
                <FieldLabel htmlFor="album-lock">{m.admin_albums_locks()}</FieldLabel>
                <DatePicker id="album-lock" name="lockAt" value={lockAt} onChange={changeLock} min={dateValue(new Date())} required />
                <FieldDescription>{m.admin_albums_locks_hint()}</FieldDescription>
            </Field>
            <Field>
                <FieldLabel htmlFor="album-delete">{m.admin_albums_deletes()}</FieldLabel>
                <DatePicker id="album-delete" name="deleteAt" value={deleteAt} onChange={setDeleteAt} min={lockAt} required />
            </Field>
            <Button type="button" variant="outline" size="sm" className="self-start" onClick={reset}>
                <IconRefresh data-icon="inline-start" />
                {m.admin_albums_date_presets()}
            </Button>
        </>
    );
}

/** A day picked in a date field, as the start of that day where the admin is. */
const fieldDate = (value: string) => new Date(`${value}T00:00`);

function EditAlbumDialog(props: { album: AlbumInfo; open: boolean; onOpenChange: (open: boolean) => void }) {
    const { album } = props;
    const published = album.status === "published";
    const refreshAlbums = useRefreshAlbums();

    const form = useFormSubmit(async (field) => {
        await updateAlbum({
            data: {
                id: album.id,
                title: field("title"),
                description: field("description"),
                date: field("date"),
                email: field("email"),
                ...(published ? { lockAt: fieldDate(field("lockAt")), deleteAt: fieldDate(field("deleteAt")) } : {}),
            },
        });
        props.onOpenChange(false);
        await refreshAlbums();
        toast.success(m.account_settings_saved());
    });

    return (
        <FormDialog open={props.open} onOpenChange={props.onOpenChange} title={m.admin_albums_edit()} submit={m.dashboard_save()} form={form}>
            <DetailsFields album={album} />
            {published && <DateFields lockAt={album.lockAt} deleteAt={album.deleteAt} />}
        </FormDialog>
    );
}

/** Publishes the album with when it locks and is deleted; the client gets an email, when it has one. */
function PublishDialog(props: { album: AlbumInfo; open: boolean; onOpenChange: (open: boolean) => void }) {
    const refreshAlbums = useRefreshAlbums();

    const form = useFormSubmit(async (field) => {
        await publishAlbumById({ data: { id: props.album.id, lockAt: fieldDate(field("lockAt")), deleteAt: fieldDate(field("deleteAt")) } });
        props.onOpenChange(false);
        await refreshAlbums();
        toast.success(m.admin_albums_published());
    });

    return (
        <FormDialog
            open={props.open}
            onOpenChange={props.onOpenChange}
            title={m.admin_albums_publish()}
            description={props.album.email ? m.admin_albums_publish_description({ email: props.album.email }) : m.admin_albums_publish_no_email()}
            submit={m.admin_albums_publish()}
            form={form}
        >
            <DateFields lockAt={props.album.lockAt} deleteAt={props.album.deleteAt} />
        </FormDialog>
    );
}

/** The album's public link, on the account site, in the admin's language. */
function useAlbumLink(token: string) {
    const publicUrl = usePublicUrl();
    return () => publicUrl({ to: "/account/albums/$token", params: { token } });
}

/**
 * The album's "…" menu, in the list and on its page: edit, publish or back to draft, its link, delete. `onDeleted`
 * leaves its page once it's gone.
 */
export function AlbumMenu(props: { album: AlbumInfo; onDeleted?: () => Promise<unknown> }) {
    const { album } = props;
    const albumLink = useAlbumLink(album.token);
    const [dialog, setDialog] = useState<"publish" | "unpublish" | "edit" | "link" | "delete">();
    const closeDialog = (open: boolean) => setDialog(open ? dialog : undefined);
    const published = album.status === "published";

    const copyLink = async () => {
        await navigator.clipboard.writeText(albumLink());
        toast.success(m.album_link_copied());
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={m.table_actions()} />}>
                    <IconDots />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-52">
                    <DropdownMenuItem onClick={() => setDialog("edit")}>
                        <IconPencil />
                        {m.table_edit()}
                    </DropdownMenuItem>
                    {
                        published
                            ? (
                                <DropdownMenuItem onClick={() => setDialog("unpublish")}>
                                    <IconWritingSign />
                                    {m.admin_albums_unpublish()}
                                </DropdownMenuItem>
                            )
                            : (
                                <DropdownMenuItem onClick={() => setDialog("publish")}>
                                    <IconSend />
                                    {m.admin_albums_publish()}
                                </DropdownMenuItem>
                            )
                    }
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => window.open(albumLink(), "_blank", "noopener")}>
                        <IconExternalLink />
                        {m.admin_albums_view()}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={copyLink}>
                        <IconCopy />
                        {m.album_copy_link()}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDialog("link")}>
                        <IconLink />
                        {m.album_renew_link()}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => setDialog("delete")}>
                        <IconTrash />
                        {m.table_delete()}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {/* keyed, so they start over from the saved album */}
            <PublishDialog key={`publish-${album.updatedAt.getTime()}`} album={album} open={dialog === "publish"} onOpenChange={closeDialog} />
            <EditAlbumDialog key={`edit-${album.updatedAt.getTime()}`} album={album} open={dialog === "edit"} onOpenChange={closeDialog} />
            <AlbumConfirmDialog
                title={m.admin_albums_unpublish()}
                description={m.admin_albums_unpublish_description()}
                submit={m.admin_albums_unpublish()}
                open={dialog === "unpublish"}
                onOpenChange={closeDialog}
                action={() => unpublishAlbum({ data: { id: album.id } })}
                done={m.admin_albums_unpublished()}
            />
            <AlbumConfirmDialog
                title={m.album_renew_link()}
                description={m.album_renew_link_description()}
                submit={m.album_renew_link_submit()}
                open={dialog === "link"}
                onOpenChange={closeDialog}
                action={() => renewAlbumLink({ data: { id: album.id } })}
                done={m.album_link_renewed()}
            />
            <AlbumConfirmDialog
                title={m.admin_albums_delete()}
                description={m.admin_albums_delete_description({ title: album.title })}
                submit={m.table_delete()}
                destructive
                open={dialog === "delete"}
                onOpenChange={closeDialog}
                action={async () => {
                    await deleteAlbumById({ data: { id: album.id } });
                    await props.onDeleted?.();
                }}
                done={m.admin_albums_deleted()}
            />
        </>
    );
}

/**
 * The album's zip, as one button saying where it is: being made (and disabled), failed, missing, out of date with how
 * many changes, or up to date (and disabled). Its status follows live as it's made.
 */
function ArchiveButton(props: { album: AlbumDetails }) {
    const { album } = props;
    const [starting, setStarting] = useState(false);
    const { state, added, removed, changed } = album.archive;
    const changes = added + removed + changed;

    const sync = async () => {
        setStarting(true);
        try {
            await syncAlbumArchive({ data: { id: album.id } });
        } catch {
            toast.error(m.admin_albums_archive_busy());
        } finally {
            setStarting(false);
        }
    };

    if (album.archiveStatus === "building" || starting) {
        return (
            <Button variant="outline" disabled>
                <IconLoader2 className="animate-spin" data-icon="inline-start" />
                {m.admin_albums_archive_building()}
            </Button>
        );
    }
    if (album.archiveStatus === "failed") {
        return (
            <Button variant="outline" onClick={sync} className="text-destructive">
                <IconAlertTriangle data-icon="inline-start" />
                {m.admin_albums_archive_failed()}
            </Button>
        );
    }
    if (state === "synced") {
        return (
            <Button variant="outline" disabled>
                <IconCheck data-icon="inline-start" />
                {m.admin_albums_archive_synced()}
            </Button>
        );
    }
    return (
        <Button
            variant="outline"
            onClick={sync}
            title={state === "stale" ? m.admin_albums_archive_changes({ added, removed, changed }) : undefined}
        >
            <IconFileZip data-icon="inline-start" />
            {state === "none" ? m.admin_albums_archive_create() : m.admin_albums_archive_update({ count: changes })}
        </Button>
    );
}

/** The album page's buttons, before "Add": its status, the zip, and publishing while it's a draft. */
export function AlbumToolbar(props: { album: AlbumDetails }) {
    const { album } = props;
    const [publishing, setPublishing] = useState(false);
    const published = album.status === "published";
    const locked = album.lockAt !== null && album.lockAt <= new Date();

    return (
        <>
            <Badge variant={locked ? "destructive" : published ? "default" : "secondary"}>
                {locked ? m.admin_albums_status_locked() : published ? m.admin_albums_status_published() : m.album_draft()}
            </Badge>
            <ArchiveButton album={album} />
            {
                !published && (
                    <>
                        <Button variant="outline" onClick={() => setPublishing(true)}>
                            <IconSend data-icon="inline-start" />
                            {m.admin_albums_publish()}
                        </Button>
                        <PublishDialog key={`publish-${album.updatedAt.getTime()}`} album={album} open={publishing} onOpenChange={setPublishing} />
                    </>
                )
            }
        </>
    );
}

/** The album's menu on its own page, next to the search; deleting the album goes back to the list. */
export function AlbumPageMenu(props: { album: AlbumDetails }) {
    const navigate = useNavigate();
    return <AlbumMenu album={props.album} onDeleted={() => navigate({ to: "/admin/albums" })} />;
}

//
// the list
//

const column = createDataColumns<AdminAlbum>();

type ListStatus = "draft" | "published" | "locked";

const statusOf = (album: AdminAlbum): ListStatus =>
    album.status === "draft" ? "draft" : album.lockAt && album.lockAt <= new Date() ? "locked" : "published";

const statusLabels: Record<ListStatus, () => string> = {
    draft: m.album_draft,
    published: m.admin_albums_status_published,
    locked: m.admin_albums_status_locked,
};

const dateCell = (date: Date | null) => date && <span className="text-muted-foreground">{formatDate(date.toISOString())}</span>;

export const albumColumns = column.columns([
    column.accessor("title", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.admin_albums_title()} />,
        sortFn: "text",
        cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
    }),
    column.accessor((album) => album.email ?? "", {
        id: "email",
        header: ({ column: header }) => <SortableHeader column={header} title={m.common_email()} />,
        sortFn: "text",
        cell: ({ getValue }) => <span className="text-muted-foreground">{getValue()}</span>,
    }),
    column.accessor("date", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.admin_albums_date()} />,
        sortFn: "alphanumeric",
        cell: ({ getValue }) => <span className="text-muted-foreground">{formatDate(getValue())}</span>,
    }),
    column.accessor(statusOf, {
        id: "status",
        header: () => m.admin_users_status(),
        filterFn: "equalsString",
        cell: ({ getValue }) => (
            <Badge variant={getValue() === "locked" ? "destructive" : getValue() === "published" ? "default" : "secondary"}>
                {statusLabels[getValue()]()}
            </Badge>
        ),
    }),
    column.accessor("mediaCount", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.admin_portfolio_media()} />,
        sortFn: "basic",
        cell: ({ getValue }) => <span className="text-muted-foreground">{getValue()}</span>,
    }),
    column.accessor((album) => album.lockAt?.toISOString() ?? "", {
        id: "lockAt",
        header: ({ column: header }) => <SortableHeader column={header} title={m.admin_albums_locks()} />,
        sortFn: "alphanumeric",
        cell: ({ row }) => dateCell(row.original.lockAt),
    }),
    column.accessor((album) => album.deleteAt?.toISOString() ?? "", {
        id: "deleteAt",
        header: ({ column: header }) => <SortableHeader column={header} title={m.admin_albums_deletes()} />,
        sortFn: "alphanumeric",
        cell: ({ row }) => dateCell(row.original.deleteAt),
    }),
    column.display({
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center justify-end gap-1">
                <RowLink label={m.admin_albums_open()} to="/admin/albums/$id" params={{ id: row.original.id }} />
                <AlbumMenu album={row.original} />
            </div>
        ),
    }),
]);

export const albumFilters = [
    {
        column: "status",
        title: m.admin_users_status,
        options: (Object.keys(statusLabels) as ListStatus[]).map((status) => ({ value: status, label: statusLabels[status] })),
    },
];
