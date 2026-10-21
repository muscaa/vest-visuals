import { m } from "@shared/paraglide/messages";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IconBan, IconDots, IconKey, IconLockOpen, IconPencil, IconTrash, IconUserPlus } from "@tabler/icons-react";
import { toast } from "sonner";
import { authClient, authErrorMessage } from "@client/auth";
import { SortableHeader, createDataColumns } from "../data-table";
import { FormDialog } from "../form-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { Role } from "@shared/auth";
import type { DataTableFilter } from "../data-table";
import type { AdminUser } from "@/functions/admin";
import { formatDate } from "@/i18n";
import { useFormSubmit } from "@/hooks/form";
import { usePublicUrl, useUser } from "@/hooks/auth";
import { usersQuery } from "@/functions/admin";

const roles: Record<Role, () => string> = {
    admin: m.admin_users_role_admin,
    user: m.admin_users_role_user,
};

type Status = "active" | "unconfirmed" | "banned";

const statuses: Record<Status, () => string> = {
    active: m.admin_users_status_active,
    unconfirmed: m.admin_users_status_unconfirmed,
    banned: m.admin_users_status_banned,
};

function statusOf(user: AdminUser): Status {
    if (user.banned) return "banned";
    if (!user.emailVerified) return "unconfirmed";
    return "active";
}

function roleOf(user: AdminUser): Role {
    return user.role === "admin" ? "admin" : "user";
}

/** Reloads the table after changing a user. */
function useRefreshUsers() {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: usersQuery.queryKey });
}

/** Where the "choose a password" links lead. */
function usePasswordLink() {
    const publicUrl = usePublicUrl();
    return () => publicUrl({ to: "/account/reset-password" });
}

function RoleSelect(props: { defaultValue: Role; disabled?: boolean }) {
    const items = (Object.keys(roles) as Role[]).map((role) => ({ value: role, label: roles[role]() }));

    return (
        <Select name="role" items={items} defaultValue={props.defaultValue} disabled={props.disabled}>
            <SelectTrigger id="user-role" className="w-full">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
            </SelectContent>
        </Select>
    );
}

/** Creates the account without a password; the user chooses one from the email it gets. */
export function AddUserDialog() {
    const [open, setOpen] = useState(false);
    const refreshUsers = useRefreshUsers();
    const passwordLink = usePasswordLink();

    const form = useFormSubmit(async (field) => {
        const email = field("email").trim();
        const created = await authClient.admin.createUser({
            email,
            // the server falls back to the part of the email before the @
            name: field("name").trim(),
            role: field("role") as Role,
            // the link to choose a password goes to this address, which confirms it
            data: { emailVerified: true },
        });
        if (created.error) {
            return authErrorMessage(created.error);
        }

        const sent = await authClient.requestPasswordReset({ email, redirectTo: passwordLink() });
        if (sent.error) {
            return authErrorMessage(sent.error);
        }

        await refreshUsers();
        setOpen(false);
        toast.success(m.admin_users_created({ email }));
    });

    return (
        <FormDialog
            open={open}
            onOpenChange={setOpen}
            trigger={
                <>
                    <IconUserPlus data-icon="inline-start" />
                    {m.admin_users_add()}
                </>
            }
            title={m.admin_users_add()}
            description={m.admin_users_add_description()}
            form={form}
        >
            <Field>
                <FieldLabel htmlFor="user-email">{m.common_email()}</FieldLabel>
                <Input id="user-email" name="email" type="email" placeholder={m.common_email_placeholder()} required />
            </Field>
            <Field>
                <FieldLabel htmlFor="user-name">{m.common_name()}</FieldLabel>
                <Input id="user-name" name="name" maxLength={100} />
                <FieldDescription>{m.admin_users_name_hint()}</FieldDescription>
            </Field>
            <Field>
                <FieldLabel htmlFor="user-role">{m.admin_users_role()}</FieldLabel>
                <RoleSelect defaultValue="user" />
            </Field>
        </FormDialog>
    );
}

function EditUserDialog(props: { user: AdminUser; self: boolean; open: boolean; onOpenChange: (open: boolean) => void }) {
    const { user } = props;
    const refreshUsers = useRefreshUsers();

    const form = useFormSubmit(async (field) => {
        const name = field("name").trim();
        if (name !== user.name) {
            const { error } = await authClient.admin.updateUser({ userId: user.id, data: { name } });
            if (error) {
                return authErrorMessage(error);
            }
        }

        // a disabled select isn't sent
        const role = (field("role") || roleOf(user)) as Role;
        if (role !== roleOf(user)) {
            const { error } = await authClient.admin.setRole({ userId: user.id, role });
            if (error) {
                return authErrorMessage(error);
            }
        }

        props.onOpenChange(false);
        await refreshUsers();
        toast.success(m.account_settings_saved());
    });

    return (
        <FormDialog
            open={props.open}
            onOpenChange={props.onOpenChange}
            title={m.admin_users_edit()}
            description={user.email}
            submit={m.dashboard_save()}
            form={form}
        >
            <Field>
                <FieldLabel htmlFor="user-name">{m.common_name()}</FieldLabel>
                <Input id="user-name" name="name" defaultValue={user.name} maxLength={100} required />
            </Field>
            <Field>
                <FieldLabel htmlFor="user-role">{m.admin_users_role()}</FieldLabel>
                <RoleSelect defaultValue={roleOf(user)} disabled={props.self} />
                {props.self && <FieldDescription>{m.admin_users_role_own()}</FieldDescription>}
            </Field>
        </FormDialog>
    );
}

function DeleteUserDialog(props: { user: AdminUser; open: boolean; onOpenChange: (open: boolean) => void }) {
    const { user } = props;
    const refreshUsers = useRefreshUsers();

    const form = useFormSubmit(async () => {
        const { error } = await authClient.admin.removeUser({ userId: user.id });
        if (error) {
            return authErrorMessage(error);
        }

        await refreshUsers();
        props.onOpenChange(false);
        toast.success(m.admin_users_deleted({ email: user.email }));
    });

    return (
        <FormDialog
            open={props.open}
            onOpenChange={props.onOpenChange}
            title={m.admin_users_delete()}
            description={m.admin_users_delete_description({ email: user.email })}
            submit={m.table_delete()}
            destructive
            form={form}
        />
    );
}

/** The "…" menu of a user's row. Admins can't ban or delete themselves. */
function UserActions(props: { user: AdminUser }) {
    const { user } = props;
    const self = useUser().id === user.id;
    const refreshUsers = useRefreshUsers();
    const passwordLink = usePasswordLink();
    const [dialog, setDialog] = useState<"edit" | "delete">();

    /** Runs an action straight from the menu, reporting how it went in a toast. */
    const run = async (action: () => Promise<{ error: { code?: string; status?: number } | null }>, done: string) => {
        const { error } = await action();
        if (error) {
            toast.error(authErrorMessage(error));
            return;
        }
        await refreshUsers();
        toast.success(done);
    };

    const sendPasswordLink = () => run(
        () => authClient.requestPasswordReset({ email: user.email, redirectTo: passwordLink() }),
        m.admin_users_password_sent({ email: user.email }),
    );
    const toggleBan = () => (user.banned
        ? run(() => authClient.admin.unbanUser({ userId: user.id }), m.admin_users_unbanned({ email: user.email }))
        : run(() => authClient.admin.banUser({ userId: user.id }), m.admin_users_banned({ email: user.email })));

    const closeDialog = (open: boolean) => setDialog(open ? dialog : undefined);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={m.table_actions()} />}>
                    <IconDots />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-48">
                    <DropdownMenuItem onClick={() => setDialog("edit")}>
                        <IconPencil />
                        {m.table_edit()}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={sendPasswordLink}>
                        <IconKey />
                        {m.admin_users_send_password()}
                    </DropdownMenuItem>
                    {
                        !self && (
                            <>
                                <DropdownMenuItem onClick={toggleBan}>
                                    {user.banned ? <IconLockOpen /> : <IconBan />}
                                    {user.banned ? m.admin_users_unban() : m.admin_users_ban()}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive" onClick={() => setDialog("delete")}>
                                    <IconTrash />
                                    {m.table_delete()}
                                </DropdownMenuItem>
                            </>
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            {/* keyed by the saved values, so its fields start over from them once saved */}
            <EditUserDialog key={`${user.name}-${user.role}`} user={user} self={self} open={dialog === "edit"} onOpenChange={closeDialog} />
            {!self && <DeleteUserDialog user={user} open={dialog === "delete"} onOpenChange={closeDialog} />}
        </>
    );
}

function UserName(props: { user: AdminUser }) {
    const { user } = props;
    const self = useUser().id === user.id;

    return (
        <div className="flex items-center gap-3">
            <Avatar size="sm">
                <AvatarImage src={user.image ?? undefined} alt={user.name} />
                <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{user.name}</span>
            {self && <Badge variant="outline">{m.admin_users_you()}</Badge>}
        </div>
    );
}

const column = createDataColumns<AdminUser>();

export const userColumns = column.columns([
    column.accessor("name", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.common_name()} />,
        sortFn: "text",
        cell: ({ row }) => <UserName user={row.original} />,
    }),
    column.accessor("email", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.common_email()} />,
        sortFn: "text",
    }),
    column.accessor(roleOf, {
        id: "role",
        header: () => m.admin_users_role(),
        filterFn: "equalsString",
        cell: ({ getValue }) => (
            <Badge variant={getValue() === "admin" ? "default" : "secondary"}>
                {roles[getValue()]()}
            </Badge>
        ),
    }),
    column.accessor(statusOf, {
        id: "status",
        header: () => m.admin_users_status(),
        filterFn: "equalsString",
        cell: ({ getValue }) => (
            <Badge variant={getValue() === "banned" ? "destructive" : "outline"}>
                {statuses[getValue()]()}
            </Badge>
        ),
    }),
    column.accessor((user) => user.createdAt.toISOString(), {
        id: "createdAt",
        header: ({ column: header }) => <SortableHeader column={header} title={m.dashboard_created()} />,
        sortFn: "alphanumeric",
        cell: ({ getValue }) => <span className="text-muted-foreground">{formatDate(getValue())}</span>,
    }),
    column.display({
        id: "actions",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <UserActions user={row.original} />
            </div>
        ),
    }),
]);

export const userFilters: DataTableFilter[] = [
    {
        column: "role",
        title: m.admin_users_role,
        options: (Object.keys(roles) as Role[]).map((role) => ({ value: role, label: roles[role] })),
    },
    {
        column: "status",
        title: m.admin_users_status,
        options: (Object.keys(statuses) as Status[]).map((status) => ({ value: status, label: statuses[status] })),
    },
];
