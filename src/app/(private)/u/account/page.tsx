"use client";

import { useAuth } from "@/hooks/useAuth";
import { dateToString } from "@shared/snippets";
import { Button } from "@/components/ui/button";
import { TwoFactorDialog } from "@/components/dialogs/two-factor";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export default function Page() {
    const { profile } = useAuth();

    useBreadcrumbs([
        "Account",
    ]);

    return (
        <div className="flex flex-col size-full">
            {
                profile && (
                    <>
                        <div className="flex flex-col gap-1">
                            <p>ID: {profile.id}</p>
                            <p>Name: {profile.name}</p>
                            <p>Email: {profile.email} ({profile.emailVerified ? "verified ✅" : "not verified ❌"})</p>
                            <p>Created: {dateToString(profile.createdAt)}</p>
                            <div className="flex gap-2 items-center">
                                <p>2FA: {profile.twoFactorEnabled ? "enabled ✅" : "disabled ❌"}</p>
                                <TwoFactorDialog enabled={!!profile.twoFactorEnabled}>
                                    <Button size="sm">Toggle 2FA</Button>
                                </TwoFactorDialog>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
}
