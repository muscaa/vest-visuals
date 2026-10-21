import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { DeleteAccount, PreferenceSettings, ProfileSettings, SecuritySettings } from "@/components/account/settings";
import { DashboardPage } from "@/components/layout/sidebar";

export const Route = createFileRoute("/account/_dashboard/settings/")({
    staticData: {
        breadcrumbs: () => [{ label: m.account_settings() }],
    },
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <DashboardPage title={m.account_settings()} description={m.account_settings_description()} narrow>
            <ProfileSettings />
            <SecuritySettings />
            <PreferenceSettings />
            <DeleteAccount />
        </DashboardPage>
    );
}
