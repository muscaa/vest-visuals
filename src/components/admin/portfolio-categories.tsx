import { m } from "@shared/paraglide/messages";
import { useState } from "react";
import { IconDots, IconPlus, IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";
import { SortableHeader, createDataColumns } from "../data-table";
import { FormDialog, RowLink } from "../form-dialog";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useRefreshPortfolio } from "./portfolio-media";
import type { AdminPortfolioCategory } from "@/functions/portfolio-categories";
import { formatDate } from "@/i18n";
import { useFormSubmit } from "@/hooks/form";
import { createPortfolioCategory, deletePortfolioCategory } from "@/functions/portfolio-categories";

export function AddCategoryDialog() {
    const [open, setOpen] = useState(false);
    const refreshPortfolio = useRefreshPortfolio();

    const form = useFormSubmit(async (field) => {
        const key = field("key").trim();
        const { created } = await createPortfolioCategory({ data: { key } });
        if (!created) return m.admin_portfolio_category_exists({ key });

        setOpen(false);
        await refreshPortfolio();
        toast.success(m.admin_portfolio_category_created({ key }));
    });

    return (
        <FormDialog
            open={open}
            onOpenChange={setOpen}
            trigger={
                <>
                    <IconPlus data-icon="inline-start" />
                    {m.admin_portfolio_add_category()}
                </>
            }
            title={m.admin_portfolio_add_category()}
            form={form}
        >
            <Field>
                <FieldLabel htmlFor="category-key">{m.admin_assets_key()}</FieldLabel>
                <Input id="category-key" name="key" pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={100} className="font-mono" required />
                <FieldDescription>{m.admin_portfolio_category_key_hint()}</FieldDescription>
            </Field>
        </FormDialog>
    );
}

/** Deletes the category only; refused while one of its groups is in no other category. */
function DeleteCategoryDialog(props: { categoryKey: string; open: boolean; onOpenChange: (open: boolean) => void }) {
    const refreshPortfolio = useRefreshPortfolio();

    const form = useFormSubmit(async () => {
        const { deleted } = await deletePortfolioCategory({ data: { key: props.categoryKey } });
        if (!deleted) return m.admin_portfolio_category_not_empty();

        props.onOpenChange(false);
        await refreshPortfolio();
        toast.success(m.admin_portfolio_category_deleted({ key: props.categoryKey }));
    });

    return (
        <FormDialog
            open={props.open}
            onOpenChange={props.onOpenChange}
            title={m.admin_portfolio_delete_category()}
            description={m.admin_portfolio_delete_category_description({ key: props.categoryKey })}
            submit={m.table_delete()}
            destructive
            form={form}
        />
    );
}

function CategoryActions(props: { category: AdminPortfolioCategory }) {
    const [deleting, setDeleting] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={m.table_actions()} />}>
                    <IconDots />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem variant="destructive" onClick={() => setDeleting(true)}>
                        <IconTrash />
                        {m.table_delete()}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteCategoryDialog categoryKey={props.category.key} open={deleting} onOpenChange={setDeleting} />
        </>
    );
}

const column = createDataColumns<AdminPortfolioCategory>();

export const portfolioCategoryColumns = column.columns([
    column.accessor("key", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.admin_assets_key()} />,
        sortFn: "text",
        cell: ({ getValue }) => <span className="font-mono">{getValue()}</span>,
    }),
    column.accessor("groupCount", {
        header: ({ column: header }) => <SortableHeader column={header} title={m.account_portfolio_groups()} />,
        sortFn: "basic",
        cell: ({ getValue }) => <span className="text-muted-foreground">{getValue()}</span>,
    }),
    column.accessor((category) => category.updatedAt.toISOString(), {
        id: "updatedAt",
        header: ({ column: header }) => <SortableHeader column={header} title={m.dashboard_updated()} />,
        sortFn: "alphanumeric",
        cell: ({ getValue }) => <span className="text-muted-foreground">{formatDate(getValue())}</span>,
    }),
    column.display({
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center justify-end gap-1">
                <RowLink label={m.admin_portfolio_open_category()} to="/admin/portfolio/categories/$key" params={{ key: row.original.key }} />
                <CategoryActions category={row.original} />
            </div>
        ),
    }),
]);
