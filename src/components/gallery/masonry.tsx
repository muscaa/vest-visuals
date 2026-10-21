import { cn } from "@shared/shadcn/utils";
import { useMeasure } from "@uidotdev/usehooks";
import { useMemo } from "react";

/** Columns by the masonry's own width, in px: `{ 0: 2, 640: 3 }` is 2 columns, and 3 from 640px wide. */
export type MasonryColumns = Record<number, number>;

export interface MasonryProps<T> {
    items: T[];
    getKey: (item: T) => string;
    /** width / height of each item, so its place is known before it loads */
    getAspectRatio: (item: T) => number;
    renderItem: (item: T, index: number) => React.ReactNode;
    columns?: MasonryColumns;
    className?: string;
}

const defaultColumns: MasonryColumns = { 0: 2, 640: 3, 1024: 4, 1536: 5 };

function columnCount(width: number, columns: MasonryColumns) {
    const fitting = Object.keys(columns).map(Number).filter((min) => width >= min);
    return columns[Math.max(...fitting)] ?? 1;
}

/**
 * Each item goes to the shortest column, in order, so the columns end about level. Items keep their place when
 * more are added at the end, which an endless list needs.
 */
function balance<T>(items: T[], count: number, getAspectRatio: (item: T) => number) {
    const columns = Array.from({ length: count }, () => ({ height: 0, entries: [] as { item: T; index: number }[] }));
    // before the width is measured
    if (!count) return [];

    items.forEach((item, index) => {
        const shortest = columns.reduce((min, column) => (column.height < min.height ? column : min));
        shortest.entries.push({ item, index });
        shortest.height += 1 / getAspectRatio(item);
    });

    return columns.map((column) => column.entries);
}

/**
 * Items of different heights in columns, like a wall of photos. The columns depend on the masonry's width, which is
 * only known in the browser, so the server renders it empty.
 */
export function Masonry<T>({ columns = defaultColumns, ...props }: MasonryProps<T>) {
    const [ref, { width }] = useMeasure<HTMLDivElement>();
    const count = width ? columnCount(width, columns) : 0;
    const layout = useMemo(() => balance(props.items, count, props.getAspectRatio), [props.items, count, props.getAspectRatio]);

    return (
        <div
            ref={ref}
            className={cn("grid items-start gap-(--masonry-gap) [--masonry-gap:4px] sm:[--masonry-gap:6px]", props.className)}
            style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
        >
            {
                layout.map((column, index) => (
                    <div key={index} className="flex flex-col gap-(--masonry-gap)">
                        {
                            column.map(({ item, index: itemIndex }) => (
                                // hidden overflow keeps the box to its ratio, even when what's inside has another shape
                                <div key={props.getKey(item)} className="overflow-hidden" style={{ aspectRatio: props.getAspectRatio(item) }}>
                                    {props.renderItem(item, itemIndex)}
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}
