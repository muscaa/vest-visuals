import { m } from "@shared/paraglide/messages";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { IconUpload } from "@tabler/icons-react";
import type { PortfolioMedia } from "@/components/admin/demo";
import { portfolioGroups, portfolioMedia } from "@/components/admin/demo";
import { mediaColumns } from "@/components/admin/media";
import { DataTable } from "@/components/data-table";
import { FormDialog } from "@/components/form-dialog";
import { DashboardPage } from "@/components/layout/sidebar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const columns = mediaColumns<PortfolioMedia>({ sortable: false });

export const Route = createFileRoute("/admin/portfolio/groups/$id/")({
    staticData: {
        breadcrumbs: (data: { group: { id: string; description?: string } }) => [
            { label: m.common_portfolio() },
            { label: m.account_portfolio_groups(), link: { to: "/admin/portfolio/groups" } },
            { label: data.group.description ?? data.group.id },
        ],
    },
    // TODO: load the group and its media, in their saved order, from the backend
    loader: ({ params }) => {
        const group = portfolioGroups.find((value) => value.id === params.id);
        if (!group) throw notFound();

        return { group, media: portfolioMedia.filter((item) => item.groupId === group.id) };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { group, media } = Route.useLoaderData();

    return (
        <DashboardPage
            title={group.description ?? group.id}
            description={m.admin_portfolio_group_contents()}
        >
            <DataTable
                key={group.id}
                data={media}
                columns={columns}
                // TODO: save the new order once the backend is there
                reorder={{ getId: (item) => item.id }}
                actions={
                    <FormDialog
                        trigger={
                            <>
                                <IconUpload data-icon="inline-start" />
                                {m.dashboard_upload()}
                            </>
                        }
                        title={m.dashboard_upload()}
                        description={m.admin_portfolio_upload_description()}
                        submit={m.dashboard_upload()}
                    >
                        <Field>
                            <FieldLabel htmlFor="media-files">{m.admin_files()}</FieldLabel>
                            <Input id="media-files" name="files" type="file" accept="image/*,video/*" multiple required />
                        </Field>
                    </FormDialog>
                }
            />
        </DashboardPage>
    );
}
