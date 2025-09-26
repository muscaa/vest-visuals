import {
    UniqueIdentifier,
    DraggableAttributes,
} from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
export { arrayMove } from "@dnd-kit/sortable";

export type DndItem = {
    id: string;
    namespace: string;
    type: "draggable" | "dropzone" | "sortable";
};

export function getDndItem(id: UniqueIdentifier | undefined) {
    if (typeof id === "string") {
        try {
            return JSON.parse(id) as DndItem;
        } catch (error) { }
    }
    return undefined;
}

export interface DndFuncs<T> {
    pre?: T;
    post?: T;
}
export type DndStartFunc = (active: DndItem) => void;
export type DndEndFunc = (active: DndItem, over?: DndItem) => void;
export type DndOverlayFunc = (item: DndItem) => React.ReactNode;

export type DndSortable = {
    index: number;
    newIndex: number;
    isDragging: boolean;
    setRef: (node: HTMLElement | null) => void;
    attributes: DraggableAttributes;
    listeners?: SyntheticListenerMap;
    style: {
        transform?: string;
        transition?: string;
        opacity?: number;
    };
};
