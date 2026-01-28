"use client";

import { SimpleSidebar } from "./simple";
import { useAuth } from "@/hooks/useAuth";
import { SidebarNavUser } from "./nav/user";
import { SidebarNavSettings } from "./nav/settings";
import { SidebarNavAdmin } from "./nav/admin";

interface DashboardSidebarProps {

}

export function DashboardSidebar(props: DashboardSidebarProps) {
    const { logout, profile, isAdmin } = useAuth();

    return (
        <SimpleSidebar
            footer={
                <SidebarNavUser
                    user={profile && {
                        name: profile.name,
                        email: profile.email,
                        avatar: profile.image || undefined,
                    }}
                    onLogout={logout.mutate}
                />
            }
        >
            <SidebarNavSettings />
            {
                isAdmin && (
                    <SidebarNavAdmin />
                )
            }
        </SimpleSidebar>
    );
}
