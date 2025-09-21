"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { SimpleDialog } from "./simple";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
    enabled: boolean;
    children?: React.ReactNode;
}

export function TwoFactorDialog(props: Props) {
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
