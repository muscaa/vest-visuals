"use client";

import {
    SimpleSidebar,
    SimpleSidebarProvider,
    SimpleSidebarProviderProps,
} from "./simple";
import { SidebarNavUser } from "./nav/user";
import { SidebarNavSettings } from "./nav/settings";
import { useAuth } from "@/hooks/useAuth";

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
