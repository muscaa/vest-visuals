import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IconCamera, IconLoader2 } from "@tabler/icons-react";
import { toast } from "sonner";
import { z } from "zod";
import { authClient, usePublicUrl, useUser } from "@client/auth";
import { FormMessage, SubmitButton, authErrorMessage, field, useAuthForm } from "@/components/forms/auth";
import { LanguageToggle } from "@/components/language-toggle";
import { DashboardPage } from "@/components/layout/sidebar";
import { ThemeToggle } from "@/components/theme";
import { TextH2 } from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { sessionQuery } from "@/functions/auth";

/** One settings section. With `form`, it's a form with a single save button in its footer. */
function SettingsSection(props: { title: string; children: React.ReactNode; form?: ReturnType<typeof useAuthForm> }) {
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

const searchSchema = z.object({
    /** the new address, set by the email change links: first the confirmation from the old address, then the new one's */
    email: z.string().optional().catch(undefined),
    /** Better Auth's error code, when one of those links didn't work */
    error: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/account/settings/")({
    validateSearch: searchSchema,
    staticData: {
        breadcrumbs: () => [{ label: m.account_settings() }],
    },
    component: RouteComponent,
});

/** Asks for an email confirmation; the account is deleted from the link in it. */
function DeleteAccount() {
    const publicUrl = usePublicUrl();
    const [open, setOpen] = useState(false);

    const { onSubmit, pending, error } = useAuthForm(async () => {
        const { error: failed } = await authClient.deleteUser({
            callbackURL: publicUrl({ to: "/account/login", search: { notice: "deleted" } }),
        });

        if (failed) {
            return authErrorMessage(failed);
        }
        setOpen(false);
        toast.success(m.account_settings_delete_sent());
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant="destructive" />}>{m.table_delete()}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form method="post" onSubmit={onSubmit} className="flex flex-col gap-6">
                    <DialogHeader>
                        <DialogTitle>{m.account_settings_delete()}</DialogTitle>
                        <DialogDescription>{m.account_settings_delete_confirm()}</DialogDescription>
                    </DialogHeader>
                    {error && <FormMessage>{error}</FormMessage>}
                    <DialogFooter>
                        <DialogClose render={<Button type="button" variant="outline" />}>
                            {m.dialog_cancel()}
                        </DialogClose>
                        <Button type="submit" variant="destructive" disabled={pending} aria-busy={pending}>
                            {pending && <IconLoader2 data-icon="inline-start" className="animate-spin" />}
                            {m.forgot_submit()}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// TODO: change the photo once uploads are there
function RouteComponent() {
    const user = useUser();
    const search = Route.useSearch();
    const queryClient = useQueryClient();
    const publicUrl = usePublicUrl();
    /** bumped after saving the security section, so the password fields start over */
    const [securityVersion, setSecurityVersion] = useState(0);

    const refresh = () => queryClient.invalidateQueries({ queryKey: sessionQuery.queryKey });

    const profile = useAuthForm(async (fields) => {
        const name = field(fields, "name").trim();

        if (name !== user.name) {
            const { error: failed } = await authClient.updateUser({ name });
            if (failed) {
                return authErrorMessage(failed);
            }
            await refresh();
        }
        toast.success(m.account_settings_saved());
    });

    const security = useAuthForm(async (fields) => {
        const email = field(fields, "email").trim();
        const currentPassword = field(fields, "currentPassword");
        const newPassword = field(fields, "newPassword");
        const twoFactor = fields.get("twoFactor") === "on";
        const twoFactorChanged = twoFactor !== Boolean(user.twoFactorEnabled);

        if ((newPassword || twoFactorChanged) && !currentPassword) {
            return m.auth_error_password_required();
        }

        let password = currentPassword;
        if (newPassword) {
            // signs out the other devices, in case someone else knew the old password
            const { error: failed } = await authClient.changePassword({ currentPassword, newPassword, revokeOtherSessions: true });
            if (failed) {
                return authErrorMessage(failed);
            }
            password = newPassword;
        }
        if (twoFactorChanged) {
            const { error: failed } = twoFactor
                ? await authClient.twoFactor.enable({ password, method: "otp" })
                : await authClient.twoFactor.disable({ password });
            if (failed) {
                return authErrorMessage(failed);
            }
        }

        let notice = m.account_settings_saved();
        if (email !== user.email) {
            // confirmed from the current address first, then from the new one
            const { error: failed } = await authClient.changeEmail({
                newEmail: email,
                callbackURL: publicUrl({ to: "/account/settings", search: { email } }),
            });
            if (failed) {
                return authErrorMessage(failed);
            }
            notice = m.account_settings_email_sent({ email: user.email });
        }

        await refresh();
        setSecurityVersion((value) => value + 1);
        toast.success(notice);
    });

    // after the links of an email change; the address only changes with the second one
    const emailNotice = search.error
        ? <FormMessage>{authErrorMessage(search.error)}</FormMessage>
        : search.email && (
            <FormMessage variant="success">
                {
                    search.email === user.email
                        ? m.account_settings_email_changed({ email: search.email })
                        : m.account_settings_email_pending({ email: search.email })
                }
            </FormMessage>
        );

    return (
        <DashboardPage title={m.account_settings()} description={m.account_settings_description()} narrow>
            {/* keyed by the saved values, so the fields start over from them once saved */}
            <SettingsSection key={user.name} title={m.account_settings_profile()} form={profile}>
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
            <SettingsSection
                key={`${user.twoFactorEnabled}-${securityVersion}`}
                title={m.account_settings_security()}
                form={security}
            >
                {emailNotice}
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
            <SettingsSection title={m.account_settings_preferences()}>
                <SettingsRow label={m.account_settings_theme()}>
                    <ThemeToggle />
                </SettingsRow>
                <SettingsRow label={m.account_settings_language()}>
                    <LanguageToggle />
                </SettingsRow>
            </SettingsSection>
            <Card className="p-6">
                <SettingsRow label={m.account_settings_delete()} description={m.account_settings_delete_hint()}>
                    <DeleteAccount />
                </SettingsRow>
            </Card>
        </DashboardPage>
    );
}
