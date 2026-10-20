import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { IconUserPlus } from "@tabler/icons-react";
import { DataTable, SortableHeader, createDataColumns } from "@/components/data-table";
import { FormDialog, RowActions } from "@/components/form-dialog";
import { DashboardPage } from "@/components/layout/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate } from "@/i18n";

type Role = "admin" | "user";

interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: Role;
    /** ISO date */
    createdAt: string;
}

// TODO: replace with the users from the backend
const users: User[] = [
    { id: "u1", name: "Mihail Musca", email: "mihail@vestvisuals.ro", role: "admin", createdAt: "2025-03-02" },
    { id: "u2", name: "Ana Ionescu", email: "ana.ionescu@exemplu.ro", role: "user", createdAt: "2026-06-18" },
    { id: "u3", name: "Radu Popa", email: "radu.popa@exemplu.ro", role: "user", createdAt: "2026-10-11" },
];

const roles: Record<Role, () => string> = {
    admin: m.admin_users_role_admin,
    user: m.admin_users_role_user,
};

const column = createDataColumns<User>();

const columns = column.columns([
    column.accessor("name", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.common_name()} />,
        sortFn: "text",
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <Avatar size="sm">
                    <AvatarImage src={row.original.image} alt={row.original.name} />
                    <AvatarFallback>{row.original.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{row.original.name}</span>
            </div>
        ),
    }),
    column.accessor("email", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.common_email()} />,
        sortFn: "text",
    }),
    column.accessor("role", {
        header: () => m.admin_users_role(),
        filterFn: "equalsString",
        cell: ({ row }) => (
            <Badge variant={row.original.role === "admin" ? "default" : "secondary"}>
                {roles[row.original.role]()}
            </Badge>
        ),
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

function AddUserDialog() {
    const items = (Object.keys(roles) as Role[]).map((role) => ({ value: role, label: roles[role]() }));

    return (
        <FormDialog
            trigger={
                <>
                    <IconUserPlus data-icon="inline-start" />
                    {m.admin_users_add()}
                </>
            }
            title={m.admin_users_add()}
            description={m.admin_users_add_description()}
        >
            <Field>
                <FieldLabel htmlFor="user-name">{m.common_name()}</FieldLabel>
                <Input id="user-name" name="name" required />
            </Field>
            <Field>
                <FieldLabel htmlFor="user-email">{m.common_email()}</FieldLabel>
                <Input id="user-email" name="email" type="email" placeholder={m.common_email_placeholder()} required />
            </Field>
            <Field>
                <FieldLabel htmlFor="user-password">{m.common_password()}</FieldLabel>
                <Input id="user-password" name="password" type="password" autoComplete="new-password" minLength={8} required />
                <FieldDescription>{m.common_password_hint()}</FieldDescription>
            </Field>
            <Field>
                <FieldLabel htmlFor="user-role">{m.admin_users_role()}</FieldLabel>
                <Select name="role" items={items} defaultValue="user">
                    <SelectTrigger id="user-role" className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {items.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </Field>
        </FormDialog>
    );
}

export const Route = createFileRoute("/admin/users/")({
    staticData: {
        breadcrumbs: () => [{ label: m.account_users() }],
    },
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <DashboardPage title={m.account_users()} description={m.admin_users_description()}>
            <DataTable
                data={users}
                columns={columns}
                filters={[
                    {
                        column: "role",
                        title: m.admin_users_role,
                        options: [
                            { value: "admin", label: m.admin_users_role_admin },
                            { value: "user", label: m.admin_users_role_user },
                        ],
                    },
                ]}
                actions={<AddUserDialog />}
            />
        </DashboardPage>
    );
}
