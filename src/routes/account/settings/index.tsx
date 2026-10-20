import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { IconCamera } from "@tabler/icons-react";
import { LanguageToggle } from "@/components/language-toggle";
import { DashboardPage } from "@/components/layout/sidebar";
import { ThemeToggle } from "@/components/theme";
import { TextH2 } from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

// TODO: replace with the signed in user from the backend
const profile = {
    name: "Ion Popescu",
    email: "ion@exemplu.ro",
    image: undefined as string | undefined,
    twoFactorEnabled: false,
};

/** One settings section. With `save`, it's a form with a single save button in its footer. */
function SettingsSection(props: { title: string; children: React.ReactNode; save?: boolean }) {
    const content = (
        <>
            <div className="flex flex-col gap-6 p-6">
                <TextH2 size="md-3">{props.title}</TextH2>
                {props.children}
            </div>
            {
                props.save && (
                    <div className="flex justify-end px-6 py-4 border-t">
                        <Button type="submit">{m.dashboard_save()}</Button>
                    </div>
                )
            }
        </>
    );

    return (
        <Card className="gap-0 p-0">
            {
                // TODO: save once the backend is there
                props.save ? <form onSubmit={(event) => event.preventDefault()}>{content}</form> : content
            }
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

export const Route = createFileRoute("/account/settings/")({
    staticData: {
        breadcrumbs: () => [{ label: m.account_settings() }],
    },
    component: RouteComponent,
});

// TODO: change the photo, toggle 2FA and delete the account once the backend is there
function RouteComponent() {
    return (
        <DashboardPage title={m.account_settings()} description={m.account_settings_description()} narrow>
            <SettingsSection title={m.account_settings_profile()} save>
                <div className="flex items-center gap-5">
                    <button
                        type="button"
                        aria-label={m.account_settings_avatar_change()}
                        title={m.account_settings_avatar_change()}
                        className="group/avatar relative rounded-full"
                    >
                        <Avatar className="size-20">
                            <AvatarImage src={profile.image} alt={m.account_settings_avatar()} />
                            <AvatarFallback className="text-md-2">{profile.name[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="absolute inset-0 flex justify-center items-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover/avatar:opacity-100 group-focus-visible/avatar:opacity-100">
                            <IconCamera className="size-6" />
                        </span>
                    </button>
                    <Field className="flex-1">
                        <FieldLabel htmlFor="name">{m.common_name()}</FieldLabel>
                        <Input id="name" name="name" autoComplete="name" defaultValue={profile.name} />
                    </Field>
                </div>
            </SettingsSection>
            <SettingsSection title={m.account_settings_security()} save>
                <Field>
                    <FieldLabel htmlFor="email">{m.common_email()}</FieldLabel>
                    <Input id="email" name="email" type="email" autoComplete="email" defaultValue={profile.email} />
                    <FieldDescription>{m.account_settings_email_description()}</FieldDescription>
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="current-password">{m.account_settings_current_password()}</FieldLabel>
                        <Input id="current-password" name="currentPassword" type="password" autoComplete="current-password" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="new-password">{m.account_settings_new_password()}</FieldLabel>
                        <Input id="new-password" name="newPassword" type="password" autoComplete="new-password" minLength={8} />
                    </Field>
                </div>
                <Separator />
                <SettingsRow
                    label={<label htmlFor="two-factor">{m.account_settings_two_factor()}</label>}
                    description={m.account_settings_two_factor_description()}
                >
                    <Switch id="two-factor" name="twoFactor" defaultChecked={profile.twoFactorEnabled} />
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
                    <Button variant="destructive">{m.table_delete()}</Button>
                </SettingsRow>
            </Card>
        </DashboardPage>
    );
}
