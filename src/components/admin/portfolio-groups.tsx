import { m } from "@shared/paraglide/messages";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IconDots, IconLoader2, IconPencil, IconPhoto, IconPlus, IconTrash, IconUnlink } from "@tabler/icons-react";
import { toast } from "sonner";
import { SortableHeader, createDataColumns } from "../data-table";
import { FormDialog, RowLink } from "../form-dialog";
import { Img } from "../img";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { ConfirmDialog, mediaThumbnail, useRefreshPortfolio } from "./portfolio-media";
import type { AdminPortfolioGroup } from "@server/portfolio";
import type { DataTableColumn } from "../data-table";
import { formatDate } from "@/i18n";
import { useFormSubmit } from "@/hooks/form";
import { addGroupsToCategory, removeGroupFromCategory } from "@/functions/portfolio-categories";
import {
    createPortfolioGroup,
    deletePortfolioGroup,
    portfolioGroupsQuery,
    updatePortfolioGroup,
} from "@/functions/portfolio-groups";

/** How a group is named in the admin: its description, else its location, else its id. */
export function groupName(group: Pick<AdminPortfolioGroup, "id" | "description" | "location">) {
    return group.description ?? group.location ?? group.id;
}

function GroupCover(props: { group: AdminPortfolioGroup }) {
    const url = props.group.cover && mediaThumbnail(props.group.cover);
    if (!url) {
        return (
            <div className="flex size-20 items-center justify-center rounded-xl border border-dashed text-muted-foreground">
                <IconPhoto />
            </div>
        );
    }
    return <Img src={url} alt={groupName(props.group)} className="size-20 rounded-xl object-cover" />;
}

/** The location and description fields, empty for a new group or filled for editing. */
function GroupFields(props: { group?: AdminPortfolioGroup }) {
    return (
        <>
            <Field>
                <FieldLabel htmlFor="group-location">{m.admin_portfolio_location()}</FieldLabel>
                <Input id="group-location" name="location" defaultValue={props.group?.location ?? ""} maxLength={100} />
            </Field>
            <Field>
                <FieldLabel htmlFor="group-description">{m.admin_portfolio_description_label()}</FieldLabel>
                <Textarea id="group-description" name="description" defaultValue={props.group?.description ?? ""} rows={3} maxLength={1000} />
                <FieldDescription>{m.admin_portfolio_description_hint()}</FieldDescription>
            </Field>
        </>
    );
}

/** Groups not in this category yet, to pick from. */
function ExistingGroupPicker(props: { exclude: string[]; value: string[]; onChange: (ids: string[]) => void }) {
    const { data: groups = [], isPending } = useQuery(portfolioGroupsQuery);
    const choices = groups.filter((group) => !props.exclude.includes(group.id));

    if (isPending) return <IconLoader2 className="mx-auto size-5 animate-spin text-muted-foreground" />;
    if (!choices.length) return <FieldDescription>{m.admin_portfolio_no_existing_groups()}</FieldDescription>;

    const toggle = (id: string) => props.onChange(props.value.includes(id) ? props.value.filter((value) => value !== id) : [...props.value, id]);
    return (
        // keeps its height and scrolls, with room around for the picked ones' rings
        <div className="flex max-h-80 shrink-0 flex-col gap-1 overflow-y-auto p-1">
            {
                choices.map((group) => (
                    <button
                        key={group.id}
                        type="button"
                        aria-pressed={props.value.includes(group.id)}
                        onClick={() => toggle(group.id)}
                        className="flex items-center gap-3 rounded-xl p-1.5 text-left hover:bg-muted aria-pressed:bg-primary/10 aria-pressed:ring-1 aria-pressed:ring-primary"
                    >
                        <GroupCover group={group} />
                        <span className="flex flex-col">
                            <span className="font-medium">{groupName(group)}</span>
                            <span className="text-sm-2 text-muted-foreground">{group.categories.join(", ")}</span>
                        </span>
                    </button>
                ))
            }
        </div>
    );
}

type AddMode = "new" | "existing";

/** Adds to the end of a category: a new, empty group, or groups already in other categories. */
export function AddGroupDialog(props: { categoryKey: string; inCategory: string[] }) {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<AddMode>("new");
    const [picked, setPicked] = useState<string[]>([]);
    const refreshPortfolio = useRefreshPortfolio();

    const onOpenChange = (value: boolean) => {
        setPicked([]);
        setOpen(value);
    };

    const form = useFormSubmit(async (field) => {
        if (mode === "new") {
            await createPortfolioGroup({ data: { categoryKey: props.categoryKey, location: field("location"), description: field("description") } });
        } else {
            if (!picked.length) return m.admin_portfolio_pick_groups();
            await addGroupsToCategory({ data: { key: props.categoryKey, groupIds: picked } });
        }

        onOpenChange(false);
        await refreshPortfolio();
        toast.success(m.admin_portfolio_groups_added());
    });

    return (
        <FormDialog
            open={open}
            onOpenChange={onOpenChange}
            trigger={
                <>
                    <IconPlus data-icon="inline-start" />
                    {m.admin_portfolio_add()}
                </>
            }
            title={m.admin_portfolio_add_group()}
            description={m.admin_portfolio_add_group_description()}
            submit={m.admin_portfolio_add()}
            form={form}
        >
            <ToggleGroup variant="outline" value={[mode]} onValueChange={(value) => value[0] && setMode(value[0] as AddMode)}>
                <ToggleGroupItem value="new">{m.admin_portfolio_new()}</ToggleGroupItem>
                <ToggleGroupItem value="existing">{m.admin_portfolio_existing()}</ToggleGroupItem>
            </ToggleGroup>
            {mode === "new" ? <GroupFields /> : <ExistingGroupPicker exclude={props.inCategory} value={picked} onChange={setPicked} />}
        </FormDialog>
    );
}

function EditGroupDialog(props: { group: AdminPortfolioGroup; open: boolean; onOpenChange: (open: boolean) => void }) {
    const refreshPortfolio = useRefreshPortfolio();

    const form = useFormSubmit(async (field) => {
        await updatePortfolioGroup({ data: { id: props.group.id, location: field("location"), description: field("description") } });
        props.onOpenChange(false);
        await refreshPortfolio();
        toast.success(m.account_settings_saved());
    });

    return (
        <FormDialog open={props.open} onOpenChange={props.onOpenChange} title={m.admin_portfolio_edit_group()} submit={m.dashboard_save()} form={form}>
            <GroupFields group={props.group} />
        </FormDialog>
    );
}

/** The menu of a group's row: edit, take it out of the category (on a category's page), delete it. */
function GroupActions(props: { group: AdminPortfolioGroup; categoryKey?: string }) {
    const { group, categoryKey } = props;
    const [dialog, setDialog] = useState<"edit" | "remove" | "delete">();
    const closeDialog = (open: boolean) => setDialog(open ? dialog : undefined);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={m.table_actions()} />}>
                    <IconDots />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-48">
                    <DropdownMenuItem onClick={() => setDialog("edit")}>
                        <IconPencil />
                        {m.table_edit()}
                    </DropdownMenuItem>
                    {
                        categoryKey && (
                            <DropdownMenuItem onClick={() => setDialog("remove")}>
                                <IconUnlink />
                                {m.admin_portfolio_remove_from_category()}
                            </DropdownMenuItem>
                        )
                    }
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => setDialog("delete")}>
                        <IconTrash />
                        {m.table_delete()}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {/* keyed by the saved values, so its fields start over from them once saved */}
            <EditGroupDialog key={`${group.location}-${group.description}`} group={group} open={dialog === "edit"} onOpenChange={closeDialog} />
            {
                categoryKey && (
                    <ConfirmDialog
                        title={m.admin_portfolio_remove_from_category()}
                        description={m.admin_portfolio_remove_group_description()}
                        submit={m.admin_portfolio_remove()}
                        open={dialog === "remove"}
                        onOpenChange={closeDialog}
                        action={() => removeGroupFromCategory({ data: { key: categoryKey, groupId: group.id } })}
                        done={m.admin_portfolio_group_removed()}
                    />
                )
            }
            <ConfirmDialog
                title={m.admin_portfolio_delete_group()}
                description={m.admin_portfolio_delete_group_description()}
                submit={m.table_delete()}
                open={dialog === "delete"}
                onOpenChange={closeDialog}
                action={() => deletePortfolioGroup({ data: { id: group.id } })}
                done={m.admin_portfolio_group_deleted()}
            />
        </>
    );
}

/**
 * The columns of a groups table. On a category's page (`categoryKey`) they're ordered by hand, so not sortable, and the
 * menu can take one out of the category; the full list shows each one's categories.
 */
export function portfolioGroupColumns(options: { categoryKey?: string }): DataTableColumn<AdminPortfolioGroup>[] {
    const column = createDataColumns<AdminPortfolioGroup>();
    const sortable = !options.categoryKey;
    const title = (text: () => string) => (context: { column: any }) =>
        sortable ? <SortableHeader column={context.column} title={text()} /> : text();

    return column.columns([
        column.display({
            id: "cover",
            header: () => m.admin_preview(),
            cell: ({ row }) => <GroupCover group={row.original} />,
        }),
        column.accessor((group) => group.description ?? "", {
            id: "description",
            header: title(m.admin_portfolio_description_label),
            sortFn: "text",
            cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
        }),
        column.accessor((group) => group.location ?? "", {
            id: "location",
            header: title(m.admin_portfolio_location),
            sortFn: "text",
            cell: ({ getValue }) => <span className="text-muted-foreground">{getValue()}</span>,
        }),
        ...(sortable
            ? [column.display({
                id: "categories",
                header: () => m.account_portfolio_categories(),
                cell: ({ row }) => (
                    <div className="flex flex-wrap gap-1">
                        {row.original.categories.map((key) => <Badge key={key} variant="outline" className="font-mono">{key}</Badge>)}
                    </div>
                ),
            })]
            : []),
        column.accessor("mediaCount", {
            header: title(m.admin_portfolio_media),
            sortFn: "basic",
            cell: ({ getValue }) => <span className="text-muted-foreground">{getValue()}</span>,
        }),
        column.accessor((group) => group.updatedAt.toISOString(), {
            id: "updatedAt",
            header: title(m.dashboard_updated),
            sortFn: "alphanumeric",
            cell: ({ getValue }) => <span className="text-muted-foreground">{formatDate(getValue())}</span>,
        }),
        column.display({
            id: "actions",
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-1">
                    <RowLink label={m.admin_portfolio_open_group()} to="/admin/portfolio/groups/$id" params={{ id: row.original.id }} />
                    <GroupActions group={row.original} categoryKey={options.categoryKey} />
                </div>
            ),
        }),
    ]) as DataTableColumn<AdminPortfolioGroup>[];
}
