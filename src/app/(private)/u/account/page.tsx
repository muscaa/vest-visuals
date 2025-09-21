"use client";

import { Main } from "@/components/main";
import { useAuth } from "@/hooks/useAuth";
import { dateToString } from "@shared/snippets";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SimpleDialog } from "@/components/dialogs/simple";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    enabled: boolean;
    children?: React.ReactNode;
}

function TwoFactorDialog(props: Props) {
    const text = props.enabled ? {
        title: "Disable 2FA",
        description: "Enter password to disable 2FA",
        submitText: {
            default: "Disable",
            sending: "Disabling...",
        },
    } : {
        title: "Enable 2FA",
        description: "Enter password to enable 2FA",
        submitText: {
            default: "Enable",
            sending: "Enabling...",
        },
    };

    const { enable2FA, disable2FA } = useAuth();
    const [password, setPassword] = useState<string>("");

    const submit = async () => {
        if (props.enabled) {
            await disable2FA.mutateAsync(password);
        } else {
            await enable2FA.mutateAsync(password);
        }
    };

    const handleReset = () => {
        setPassword("");
    };

    return (
        <SimpleDialog
            submit={submit}
            title={text.title}
            description={text.description}
            submitText={{
                default: text.submitText.default,
                sending: text.submitText.sending,
            }}
            submitDisabled={!password}
            onReset={handleReset}
            trigger={props.children}
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </SimpleDialog>
    );
}

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
