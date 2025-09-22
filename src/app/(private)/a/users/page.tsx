"use client";

import { MainSidebarProvider } from "@/components/sidebar/main";
import { useAdmin } from "@/hooks/useAdmin";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { dateToString } from "@shared/snippets";

export default function Page() {
    const { useUsers } = useAdmin();
    const { data: users } = useUsers();

    return (
        <MainSidebarProvider
            breadcrumbs={{
                page: "Users",
            }}
        >
            <div className="flex flex-col size-full gap-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>E-mail Verified</TableHead>
                            <TableHead className="text-right">Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            users && users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
                                    <TableCell className="text-right">{dateToString(user.createdAt)}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </MainSidebarProvider>
    );
}
