"use client";

import {
    SimpleSidebar,
    SimpleSidebarProvider,
    SimpleSidebarProviderProps,
} from "./simple";
import { SidebarNavUser } from "./nav/user";
import { SidebarNavSettings } from "./nav/settings";
import { useAuth } from "@/hooks/useAuth";
import { SidebarNavAdmin } from "./nav/admin";

interface MainSidebarProps {

}

export function MainSidebar(props: MainSidebarProps) {
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

type MainSidebarProviderProps = Omit<SimpleSidebarProviderProps, "sidebar">;

export function MainSidebarProvider(props: MainSidebarProviderProps) {
    return (
        <SimpleSidebarProvider
            {...props}
            sidebar={<MainSidebar />}
        />
    );
}
