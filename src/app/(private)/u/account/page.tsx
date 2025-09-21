"use client";

import { Main } from "@/components/main";
import { useAuth } from "@/hooks/useAuth";
import { dateToString } from "@shared/snippets";
import { Button } from "@/components/ui/button";
import { TwoFactorDialog } from "@/components/dialogs/two-factor";
import { MainSidebarProvider } from "@/components/sidebar/main";

export default function Page() {
    const { useProfile } = useAuth();
    const { data } = useProfile();

    return (
        <MainSidebarProvider
            breadcrumbs={{
                page: "Account",
            }}
        >
            <div className="flex flex-col size-full">
                {
                    data && (
                        <>
                            <div className="flex flex-col gap-1">
                                <p>ID: {data.id}</p>
                                <p>Name: {data.name}</p>
                                <p>Email: {data.email} ({data.emailVerified ? "verified ✅" : "not verified ❌"})</p>
                                <p>Created: {dateToString(data.createdAt)}</p>
                                <div className="flex gap-2 items-center">
                                    <p>2FA: {data.twoFactorEnabled ? "enabled ✅" : "disabled ❌"}</p>
                                    <TwoFactorDialog enabled={!!data.twoFactorEnabled}>
                                        <Button size="sm">Toggle 2FA</Button>
                                    </TwoFactorDialog>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </MainSidebarProvider>
    );
}
