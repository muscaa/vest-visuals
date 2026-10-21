import { m } from "@shared/paraglide/messages";
import { useState } from "react";
import { IconCamera } from "@tabler/icons-react";
import { toast } from "sonner";
import { authClient, authErrorMessage } from "@client/auth";
import { FormMessage, SubmitButton } from "../forms/form-parts";
import { LanguageToggle } from "../language-toggle";
import { ThemeToggle } from "../theme";
import { TextH2 } from "../typography";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { usePublicUrl, useRefreshUser, useUser } from "@/hooks/auth";
import { useFormSubmit } from "@/hooks/form";

/** One settings section. With `form`, it's a form with a single save button in its footer. */
function SettingsSection(props: { title: string; children: React.ReactNode; form?: ReturnType<typeof useFormSubmit> }) {
    const content = (
        <>
            <div className="flex flex-col gap-6 p-6">
                <TextH2 size="md-3">{props.title}</TextH2>
                {props.children}
            </div>
            {
                props.form && (
                    <div className="flex justify-end items-center gap-4 px-6 py-4 border-t">
                        {props.form.error && <span role="alert" className="text-sm text-destructive">{props.form.error}</span>}
                        <SubmitButton pending={props.form.pending} size="default">{m.dashboard_save()}</SubmitButton>
                    </div>
                )
            }
        </>
    );

    return (
        <Card className="gap-0 p-0">
            {props.form ? <form method="post" onSubmit={props.form.onSubmit}>{content}</form> : content}
        </Card>
    );
}

/** A setting on one line: label and description on the left, the control on the right, also on small screens. */
function SettingsRow(props: { label: React.ReactNode; description?: string; children: React.ReactNode }) {
    return (
        <div className="flex justify-between items-center gap-4">
            <div className="flex flex-col min-w-0">
                <span className="font-medium">{props.label}</span>
                {props.description && <span className="text-sm-2 text-muted-foreground">{props.description}</span>}
            </div>
            <div className="flex shrink-0 items-center gap-2">{props.children}</div>
        </div>
    );
}

// TODO: change the photo once uploads are there
export function ProfileSettings() {
    const user = useUser();
    const refreshUser = useRefreshUser();

    const form = useFormSubmit(async (field) => {
        const name = field("name").trim();

        if (name !== user.name) {
            const { error: failed } = await authClient.updateUser({ name });
            if (failed) {
                return authErrorMessage(failed);
            }
            await refreshUser();
        }
        toast.success(m.account_settings_saved());
    });

    return (
        // keyed by the saved name, so the field starts over from it once saved
        <SettingsSection key={user.name} title={m.account_settings_profile()} form={form}>
            <div className="flex items-center gap-5">
                <button
                    type="button"
                    aria-label={m.account_settings_avatar_change()}
                    title={m.account_settings_avatar_change()}
                    className="group/avatar relative rounded-full"
                >
                    <Avatar className="size-20">
                        <AvatarImage src={user.image ?? undefined} alt={m.account_settings_avatar()} />
                        <AvatarFallback className="text-md-2">{user.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="absolute inset-0 flex justify-center items-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover/avatar:opacity-100 group-focus-visible/avatar:opacity-100">
                        <IconCamera className="size-6" />
                    </span>
                </button>
                <Field className="flex-1">
                    <FieldLabel htmlFor="name">{m.common_name()}</FieldLabel>
                    <Input id="name" name="name" autoComplete="name" defaultValue={user.name} maxLength={100} required />
                </Field>
            </div>
        </SettingsSection>
    );
}

/** Email, password and two-step verification. Each is changed only when its field changed. */
export function SecuritySettings() {
    const user = useUser();
    const refreshUser = useRefreshUser();
    const publicUrl = usePublicUrl();
    /** bumped after saving, so the password fields start over */
    const [saves, setSaves] = useState(0);

    const form = useFormSubmit(async (field) => {
        const email = field("email").trim();
        const currentPassword = field("currentPassword");
        const newPassword = field("newPassword");
        const twoFactor = field("twoFactor") === "on";
        const twoFactorChanged = twoFactor !== Boolean(user.twoFactorEnabled);

        if ((newPassword || twoFactorChanged) && !currentPassword) {
            return m.auth_error_password_required();
        }

        if (newPassword) {
            // signs out the other devices, in case someone else knew the old password
            const { error: failed } = await authClient.changePassword({ currentPassword, newPassword, revokeOtherSessions: true });
            if (failed) {
                return authErrorMessage(failed);
            }
        }

        if (twoFactorChanged) {
            const password = newPassword || currentPassword;
            const { error: failed } = twoFactor
                ? await authClient.twoFactor.enable({ password, method: "otp" })
                : await authClient.twoFactor.disable({ password });
            if (failed) {
                return authErrorMessage(failed);
            }
        }

        let saved = m.account_settings_saved();
        if (email !== user.email) {
            // confirmed from the current address first, then from the new one; both links end on the status page
            const { error: failed } = await authClient.changeEmail({
                newEmail: email,
                callbackURL: publicUrl({ to: "/account/status/$status", params: { status: "email-changed" }, search: { email } }),
            });
            if (failed) {
                return authErrorMessage(failed);
            }
            saved = m.account_settings_email_sent({ email: user.email });
        }

        await refreshUser();
        setSaves((value) => value + 1);
        toast.success(saved);
    });

    return (
        <SettingsSection key={`${user.twoFactorEnabled}-${saves}`} title={m.account_settings_security()} form={form}>
            <Field>
                <FieldLabel htmlFor="email">{m.common_email()}</FieldLabel>
                <Input id="email" name="email" type="email" autoComplete="email" defaultValue={user.email} required />
                <FieldDescription>{m.account_settings_email_description()}</FieldDescription>
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                    <FieldLabel htmlFor="current-password">{m.account_settings_current_password()}</FieldLabel>
                    <Input id="current-password" name="currentPassword" type="password" autoComplete="current-password" />
                    <FieldDescription>{m.account_settings_password_description()}</FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="new-password">{m.account_settings_new_password()}</FieldLabel>
                    <Input id="new-password" name="newPassword" type="password" autoComplete="new-password" minLength={8} maxLength={128} />
                </Field>
            </div>
            <Separator />
            <SettingsRow
                label={<label htmlFor="two-factor">{m.account_settings_two_factor()}</label>}
                description={m.account_settings_two_factor_description()}
            >
                <Switch id="two-factor" name="twoFactor" defaultChecked={Boolean(user.twoFactorEnabled)} />
            </SettingsRow>
        </SettingsSection>
    );
}

export function PreferenceSettings() {
    return (
        <SettingsSection title={m.account_settings_preferences()}>
            <SettingsRow label={m.account_settings_theme()}>
                <ThemeToggle />
            </SettingsRow>
            <SettingsRow label={m.account_settings_language()}>
                <LanguageToggle />
            </SettingsRow>
        </SettingsSection>
    );
}

/** Asks for an email confirmation; the account is deleted from the link in it. */
export function DeleteAccount() {
    const publicUrl = usePublicUrl();
    const [open, setOpen] = useState(false);

    const form = useFormSubmit(async () => {
        const { error: failed } = await authClient.deleteUser({
            callbackURL: publicUrl({ to: "/account/status/$status", params: { status: "account-deleted" } }),
        });

        if (failed) {
            return authErrorMessage(failed);
        }
        setOpen(false);
        toast.success(m.account_settings_delete_sent());
    });

    return (
        <Card className="p-6">
            <SettingsRow label={m.account_settings_delete()} description={m.account_settings_delete_hint()}>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger render={<Button variant="destructive" />}>{m.table_delete()}</DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <form method="post" onSubmit={form.onSubmit} className="flex flex-col gap-6">
                            <DialogHeader>
                                <DialogTitle>{m.account_settings_delete()}</DialogTitle>
                                <DialogDescription>{m.account_settings_delete_confirm()}</DialogDescription>
                            </DialogHeader>
                            {form.error && <FormMessage>{form.error}</FormMessage>}
                            <DialogFooter>
                                <DialogClose render={<Button type="button" variant="outline" />}>
                                    {m.dialog_cancel()}
                                </DialogClose>
                                <SubmitButton pending={form.pending} size="default" variant="destructive">
                                    {m.forgot_submit()}
                                </SubmitButton>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </SettingsRow>
        </Card>
    );
}
