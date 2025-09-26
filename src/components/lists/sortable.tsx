"use client";

import {
    useId,
    useState,
    useMemo,
} from "react";
import {
    BaseList,
    BaseListEntry,
} from "./base";
import {
    DndItem,
    DndSortable,
} from "@client/dnd";
import { useDnd } from "@/hooks/useDnd";
import { Sortable } from "../dnd/sortable";

interface SortableListEntryProps<V> {
    isSelected: () => boolean;
    select: () => void;
    value: V;
    index: number;
    item: DndItem;
    entry: (value: V, index: number, sortable: DndSortable) => React.ReactNode;
}

export function SortableListEntry<V>(props: SortableListEntryProps<V>) {
    const { useItemSortable } = useDnd();
    const sortable = useItemSortable(props.item);

    return (
        <BaseListEntry
            ref={sortable.setRef}
            isSelected={props.isSelected}
            select={props.select}
            style={sortable.style}
            {...sortable.attributes}
        >
            {props.entry(props.value, props.index, sortable)}
        </BaseListEntry>
    );
}

interface SortableListProps<V> {
    data: V[];
    entry: (value: V, index: number, sortable: DndSortable) => React.ReactNode;
    entryToId: (value: V, index: number) => string;
    move: (from: number, to: number) => void;
    isSelected?: (value: V) => boolean;
    onSelect?: (value: V) => void;
    children?: React.ReactNode;
    disabled?: boolean;
}

export function SortableList<V>(props: SortableListProps<V>) {
    const namespace = useId();
    const items: DndItem[] = useMemo(() => props.data.map((value, index) => ({
        id: props.entryToId(value, index),
        namespace: namespace,
        type: "sortable",
    })), [props.data]);

    const [selected, setSelected] = useState<V>();
    const isSelected = props.isSelected ?? ((value: V) => selected == value);
    const select = props.onSelect ?? ((value: V) => setSelected(value));

    const { useEnd } = useDnd();
    useEnd({
        pre: (active, over) => {
            if (!over) return;

            if (active.type !== "sortable" || over.type !== "sortable") return;
            if (active.namespace !== namespace || over.namespace !== namespace) return;

            const from = items.findIndex((value) => value.id === active.id);
            const to = items.findIndex((value) => value.id === over.id);
            if (from === to) return;

            props.move(from, to);
        }
    });

    return (
        <Sortable
            namespace={namespace}
            items={items}
            overlayFunc={(item, index) => (
                <SortableListEntry
                    isSelected={() => false}
                    select={() => { }}
                    value={props.data[index]}
                    index={index}
                    item={item}
                    entry={props.entry}
                />
            )}
            disabled={props.disabled}
        >
            <BaseList
                header={props.children}
                entries={
                    props.data.map((value, index) => (
                        <SortableListEntry
                            key={index}
                            isSelected={() => isSelected(value)}
                            select={() => select(value)}
                            value={value}
                            index={index}
                            item={items[index]}
                            entry={props.entry}
                        />
                    ))
                }
            />
        </Sortable>
    );
}
