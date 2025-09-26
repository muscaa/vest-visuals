"use client";

import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndItem } from "@client/dnd";
import { useDnd } from "@/hooks/useDnd";

interface SortableProps {
    namespace: string;
    items: DndItem[];
    overlayFunc: (item: DndItem, index: number) => React.ReactNode;
    children: React.ReactNode;
    disabled?: boolean;
}

export function Sortable(props: SortableProps) {
    const { useOverlay } = useDnd();

    useOverlay(props.namespace, (item) => {
        const index = props.items.findIndex((value) => value.id === item.id);
        return props.overlayFunc(item, index);
    });

    return (
        <SortableContext
            id={props.namespace}
            strategy={verticalListSortingStrategy}
            items={props.items.map((item) => JSON.stringify(item))}
            disabled={props.disabled}
        >
            {props.children}
        </SortableContext>
    );
}
