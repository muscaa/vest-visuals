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
    const { useProfile, logout } = useAuth();
    const { data } = useProfile();

    return (
        <SimpleSidebar
            footer={
                <SidebarNavUser
                    user={data && {
                        name: data.name,
                        email: data.email,
                        avatar: data.image || undefined,
                    }}
                    onLogout={logout.mutate}
                />
            }
        >
            <SidebarNavSettings />
            {
                data && data.role === "admin" && (
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
