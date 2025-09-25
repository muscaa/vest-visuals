import { UniqueIdentifier } from "@dnd-kit/core";

export type DndId = {
    id: string;
    type: "draggable" | "dropzone" | "sortable";
};

export function getDndId(id: UniqueIdentifier | undefined) {
    if (typeof id === "string") {
        try {
            return JSON.parse(id) as DndId;
        } catch (error) { }
    }
    return undefined;
}

export type DndStartFunc = (active: DndId) => void;
export type DndEndFunc = (active: DndId, over?: DndId) => void;
