import { m } from "@shared/paraglide/messages";
import { SortableHeader, createDataColumns } from "../data-table";
import { RowActions } from "../form-dialog";
import { Img } from "../img";
import { Badge } from "../ui/badge";
import type { DataTableColumn } from "../data-table";
import { formatDate } from "@/i18n";

export interface MediaVariant {
    /** e.g. "medium", "large" */
    tag: string;
    url: string;
}

/** A small preview of stored media, from its first variant. */
export function MediaPreview(props: { variants: MediaVariant[]; alt: string }) {
    const preview = props.variants[0];
    return preview ? <Img src={preview.url} alt={props.alt} loading="lazy" className="size-20 rounded-xl object-cover" /> : null;
}

/** Links to every size of stored media. */
export function MediaVariants(props: { variants: MediaVariant[] }) {
    return (
        <div className="flex flex-wrap gap-1.5">
            {
                props.variants.map((variant) => (
                    <Badge
                        key={variant.tag}
                        variant="outline"
                        render={<a href={variant.url} target="_blank" rel="noopener noreferrer" />}
                    >
                        {variant.tag}
                    </Badge>
                ))
            }
        </div>
    );
}

/** Anything stored with size variants: assets, portfolio media, album files. */
export interface StoredMedia {
    id: string;
    variants: MediaVariant[];
    /** ISO date */
    createdAt: string;
}

/**
 * The columns of a media table: preview, id, size variants, date and the row menu.
 * `sortable` adds sortable headers, for lists; leave it off for tables ordered by hand.
 */
export function mediaColumns<TData extends StoredMedia>(options: { sortable: boolean }): DataTableColumn<TData>[] {
    const column = createDataColumns<TData>();
    // the header's column is typed per table, so it's taken loosely here
    const title = (text: () => string) => (context: { column: any }) =>
        options.sortable ? <SortableHeader column={context.column} title={text()} /> : text();

    return column.columns([
        column.display({
            id: "preview",
            header: () => m.admin_preview(),
            cell: ({ row }) => <MediaPreview variants={row.original.variants} alt={row.original.id} />,
        }),
        column.accessor((item) => item.id, {
            id: "id",
            header: title(m.admin_id),
            sortFn: "alphanumeric",
            cell: ({ row }) => <span className="font-mono text-sm-2">{row.original.id}</span>,
        }),
        column.display({
            id: "variants",
            header: () => m.dashboard_variants(),
            cell: ({ row }) => <MediaVariants variants={row.original.variants} />,
        }),
        column.accessor((item) => item.createdAt, {
            id: "createdAt",
            header: title(m.dashboard_created),
            sortFn: "alphanumeric",
            cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.createdAt)}</span>,
        }),
        column.display({
            id: "actions",
            cell: () => <RowActions />,
        }),
    ]) as DataTableColumn<TData>[];
}
