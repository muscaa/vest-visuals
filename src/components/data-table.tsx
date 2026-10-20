import { m } from "@shared/paraglide/messages";
import { createContext, useContext, useId, useMemo, useState } from "react";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@shared/shadcn/utils";
import {
    IconArrowDown,
    IconArrowUp,
    IconArrowsSort,
    IconChevronLeft,
    IconChevronRight,
    IconGripVertical,
    IconSearch,
} from "@tabler/icons-react";
import {
    columnFilteringFeature,
    createColumnHelper,
    createFilteredRowModel,
    createPaginatedRowModel,
    createSortedRowModel,
    filterFn_equalsString,
    filterFn_includesString,
    globalFilteringFeature,
    rowPaginationFeature,
    rowSortingFeature,
    sortFn_alphanumeric,
    sortFn_basic,
    sortFn_datetime,
    sortFn_text,
    tableFeatures,
    useTable,
} from "@tanstack/react-table";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import type { Column, ColumnDef, RowData } from "@tanstack/react-table";
import type { DragEndEvent, DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

/** Everything the admin tables can do: search, filters, sorting and pagination, all on the client. */
export const dataTableFeatures = tableFeatures({
    columnFilteringFeature,
    globalFilteringFeature,
    rowSortingFeature,
    rowPaginationFeature,
    filteredRowModel: createFilteredRowModel(),
    sortedRowModel: createSortedRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
    filterFns: { includesString: filterFn_includesString, equalsString: filterFn_equalsString },
    sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text, datetime: sortFn_datetime, basic: sortFn_basic },
});

type Features = typeof dataTableFeatures;

/** Typed column helpers for a table of `TData`. */
export function createDataColumns<TData extends RowData>() {
    return createColumnHelper<Features, TData>();
}

export type DataTableColumn<TData extends RowData> = ColumnDef<Features, TData, any>;

/** A clickable column header that sorts by that column. */
export function SortableHeader<TData extends RowData, TValue>(props: { column: Column<Features, TData, TValue>; title: string }) {
    const sorted = props.column.getIsSorted();
    const SortIcon = sorted === "asc" ? IconArrowUp : sorted === "desc" ? IconArrowDown : IconArrowsSort;

    return (
        <button
            type="button"
            onClick={props.column.getToggleSortingHandler()}
            aria-label={m.table_sort({ column: props.title })}
            className="inline-flex items-center gap-1.5 -ml-1 px-1 rounded-md hover:text-foreground"
        >
            {props.title}
            <SortIcon className="size-3.5 text-muted-foreground" />
        </button>
    );
}

export interface DataTableFilter {
    /** the column's id */
    column: string;
    title: () => string;
    options: { value: string; label: () => string }[];
}

export interface DataTableProps<TData extends RowData> {
    data: TData[];
    columns: DataTableColumn<TData>[];
    /** dropdowns next to the search, each filtering one column by exact value */
    filters?: DataTableFilter[];
    /** on the right of the toolbar, e.g. an "Add" button */
    actions?: React.ReactNode;
    /**
     * Rows are ordered by hand, by dragging a handle. Every row is shown (no pagination) and dragging is off while
     * searching, since reordering part of the list is ambiguous. Don't combine it with sortable headers.
     */
    reorder?: {
        /** a stable id per row */
        getId: (row: TData) => string;
        /** the new order, after a row was dropped */
        onReorder?: (rows: TData[]) => void;
    };
}

const pageSizes = [10, 20, 50];
const all = "__all__";

interface SortableRowState {
    attributes: DraggableAttributes;
    listeners: SyntheticListenerMap | undefined;
    setActivatorNodeRef: (element: HTMLElement | null) => void;
    disabled: boolean;
}

const SortableRowContext = createContext<SortableRowState | null>(null);

/** The handle a row is dragged by, with the mouse, a finger or the keyboard (space, arrows, space). */
function DragHandle() {
    const sortable = useContext(SortableRowContext);
    if (!sortable) return null;

    return (
        <button
            type="button"
            ref={sortable.setActivatorNodeRef}
            {...sortable.attributes}
            {...sortable.listeners}
            disabled={sortable.disabled}
            aria-label={m.table_drag()}
            title={m.table_drag()}
            className="flex justify-center items-center size-8 rounded-lg text-muted-foreground touch-none cursor-grab hover:bg-muted hover:text-foreground active:cursor-grabbing disabled:opacity-30 disabled:cursor-not-allowed"
        >
            <IconGripVertical className="size-4" />
        </button>
    );
}

function SortableRow(props: { id: string; disabled: boolean; children: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
        id: props.id,
        disabled: props.disabled,
    });

    return (
        <SortableRowContext value={{ attributes, listeners, setActivatorNodeRef, disabled: props.disabled }}>
            <TableRow
                ref={setNodeRef}
                style={{ transform: CSS.Translate.toString(transform), transition }}
                className={cn("relative", isDragging && "z-10 bg-muted shadow-lg")}
            >
                {props.children}
            </TableRow>
        </SortableRowContext>
    );
}

/** A table with search, filters, sortable columns and pagination, based on shadcn's data table. */
export function DataTable<TData extends RowData>(props: DataTableProps<TData>) {
    const [globalFilter, setGlobalFilter] = useState("");
    const [order, setOrder] = useState(props.data);
    const dndId = useId();
    const reorder = props.reorder;
    const data = reorder ? order : props.data;

    const columns = useMemo(
        () => (reorder ? [{ id: "drag", header: () => null, cell: () => <DragHandle /> } as DataTableColumn<TData>, ...props.columns] : props.columns),
        [reorder, props.columns],
    );

    const table = useTable({
        features: dataTableFeatures,
        columns,
        data,
        getRowId: reorder ? (row: TData) => reorder.getId(row) : undefined,
        globalFilterFn: "includesString",
        initialState: { pagination: { pageIndex: 0, pageSize: reorder ? Number.MAX_SAFE_INTEGER : pageSizes[0] } },
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const rows = table.getRowModel().rows;
    const pagination = table.state.pagination;
    const pageCount = Math.max(table.getPageCount(), 1);
    const dragDisabled = globalFilter !== "";

    const handleDragEnd = (event: DragEndEvent) => {
        if (!reorder || !event.over || event.active.id === event.over.id) return;

        const ids = order.map(reorder.getId);
        const next = arrayMove(order, ids.indexOf(String(event.active.id)), ids.indexOf(String(event.over.id)));
        setOrder(next);
        reorder.onReorder?.(next);
    };

    const body = rows.length > 0
        ? rows.map((row) => {
            const cells = row.getAllCells().map((cell) => (
                <TableCell key={cell.id} className={cn(cell.column.id === "actions" && "w-px text-right", cell.column.id === "drag" && "w-px pr-0")}>
                    <table.FlexRender cell={cell} />
                </TableCell>
            ));

            return reorder
                ? <SortableRow key={row.id} id={row.id} disabled={dragDisabled}>{cells}</SortableRow>
                : <TableRow key={row.id}>{cells}</TableRow>;
        })
        : (
            <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    {m.table_no_results()}
                </TableCell>
            </TableRow>
        );

    const tableElement = (
        <div className="rounded-2xl border overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
                    {
                        table.getHeaderGroups().map((group) => (
                            <TableRow key={group.id}>
                                {
                                    group.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                                        </TableHead>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {
                        reorder
                            ? (
                                <SortableContext items={rows.map((row) => row.id)} strategy={verticalListSortingStrategy}>
                                    {body}
                                </SortableContext>
                            )
                            : body
                    }
                </TableBody>
            </Table>
        </div>
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
                <InputGroup className="w-full sm:w-72">
                    <InputGroupAddon>
                        <IconSearch />
                    </InputGroupAddon>
                    <InputGroupInput
                        type="search"
                        value={globalFilter}
                        onChange={(event) => {
                            setGlobalFilter(event.target.value);
                            table.setGlobalFilter(event.target.value);
                        }}
                        placeholder={m.table_search()}
                        aria-label={m.table_search()}
                    />
                </InputGroup>
                {
                    props.filters?.map((filter) => {
                        const column = table.getColumn(filter.column);
                        const items = [
                            { value: all, label: `${filter.title()}: ${m.table_all()}` },
                            ...filter.options.map((option) => ({ value: option.value, label: `${filter.title()}: ${option.label()}` })),
                        ];

                        return (
                            <Select
                                key={filter.column}
                                items={items}
                                value={(column?.getFilterValue() as string | undefined) ?? all}
                                onValueChange={(value) => column?.setFilterValue(value === all ? undefined : value)}
                            >
                                <SelectTrigger className="w-auto">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        items.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        );
                    })
                }
                {props.actions && <div className="flex items-center gap-2 ml-auto">{props.actions}</div>}
            </div>
{
                // outside the table: dnd-kit adds a screen reader announcement element, which can't live in a <tbody>
                reorder
                    ? (
                        <DndContext
                            id={dndId}
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            modifiers={[restrictToVerticalAxis]}
                            onDragEnd={handleDragEnd}
                        >
                            {tableElement}
                        </DndContext>
                    )
                    : tableElement
            }
            <div className="flex flex-wrap justify-between items-center gap-4 text-sm-2 text-muted-foreground">
                <span>{m.table_total({ count: table.getFilteredRowModel().rows.length })}</span>
                {
                    !reorder && (
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span>{m.table_rows_per_page()}</span>
                                <Select
                                    items={pageSizes.map((size) => ({ value: String(size), label: String(size) }))}
                                    value={String(pagination.pageSize)}
                                    onValueChange={(value) => table.setPageSize(Number(value))}
                                >
                                    <SelectTrigger size="sm" className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            pageSizes.map((size) => (
                                                <SelectItem key={size} value={String(size)}>{size}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <span>{m.table_page_of({ page: pagination.pageIndex + 1, pages: pageCount })}</span>
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="outline"
                                    size="icon-sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label={m.table_previous()}
                                >
                                    <IconChevronLeft />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon-sm"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    aria-label={m.table_next()}
                                >
                                    <IconChevronRight />
                                </Button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
