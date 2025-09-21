"use client";

import { Main } from "@/components/main";
import { useAuth } from "@/hooks/useAuth";
import { dateToString } from "@shared/snippets";
import { Button } from "@/components/ui/button";
import { TwoFactorDialog } from "@/components/dialogs/two-factor";

export default function Page() {
    const { useProfile } = useAuth();
    const { data } = useProfile();

    return (
        <Main>
            <div className="flex flex-col justify-center items-center size-full p-8">
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
        </Main>
    );
}
