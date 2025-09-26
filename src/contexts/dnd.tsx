"use client";

import {
    createContext,
    useState,
    useEffect,
    useRef,
} from "react";
import {
    DndContext,
    DragOverlay,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    sortableKeyboardCoordinates,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    DndItem,
    DndFuncs,
    DndStartFunc,
    DndEndFunc,
    DndOverlayFunc,
    DndSortable,
    getDndItem,
} from "@client/dnd";

export interface DndContext {
    useStart: (funcs: DndFuncs<DndStartFunc>) => void;
    useEnd: (funcs: DndFuncs<DndEndFunc>) => void;
    useOverlay: (namespace: string, overlayFunc: DndOverlayFunc) => void;
    useItemSortable: (item: DndItem) => DndSortable;
}

export const Dnd = createContext<DndContext>(undefined as any);

interface DndContextProviderProps {
    children: React.ReactNode;
}

export function DndContextProvider(props: DndContextProviderProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const startFuncs = useRef<Set<DndFuncs<DndStartFunc>>>(new Set());
    const endFuncs = useRef<Set<DndFuncs<DndEndFunc>>>(new Set());
    const overlays = useRef<Record<string, DndOverlayFunc>>({});
    const [overlay, setOverlay] = useState<React.ReactNode>();

    const useStart = (funcs: DndFuncs<DndStartFunc>) => useEffect(() => {
        startFuncs.current.add(funcs);

        return () => {
            startFuncs.current.delete(funcs);
        };
    }, [funcs]);

    const useEnd = (funcs: DndFuncs<DndEndFunc>) => useEffect(() => {
        endFuncs.current.add(funcs);

        return () => {
            endFuncs.current.delete(funcs);
        };
    }, [funcs]);

    const useOverlay = (namespace: string, overlayFunc: DndOverlayFunc) => useEffect(() => {
        overlays.current[namespace] = overlayFunc;

        return () => {
            delete overlays.current[namespace];
        };
    }, [namespace, overlayFunc]);

    const useItemSortable = (item: DndItem) => {
        const sort = useSortable({
            id: JSON.stringify(item),
        });

        return {
            index: sort.index,
            newIndex: sort.newIndex,
            isDragging: sort.isDragging,
            setRef: sort.setNodeRef,
            attributes: sort.attributes,
            listeners: sort.listeners,
            style: {
                transform: CSS.Transform.toString(sort.transform),
                transition: sort.transition,
                opacity: sort.isDragging ? 0 : 1,
            },
        } satisfies DndSortable;
    };

    const handleStart = (active: DndItem) => {
        for (const { pre } of startFuncs.current) {
            pre?.(active);
        }

        const overlayFunc = overlays.current[active.namespace];
        setOverlay(overlayFunc?.(active));

        for (const { post } of startFuncs.current) {
            post?.(active);
        }
    };

    const handleEnd = (active: DndItem, over?: DndItem) => {
        for (const { pre } of endFuncs.current) {
            pre?.(active, over);
        }

        setOverlay(undefined);

        for (const { post } of endFuncs.current) {
            post?.(active, over);
        }
    };

    return (
        <Dnd.Provider
            value={{
                useStart,
                useEnd,
                useOverlay,
                useItemSortable,
            }}
        >
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={(event) => {
                    const active = getDndItem(event.active.id);

                    if (active) {
                        handleStart(active);
                    }
                }}
                onDragEnd={(event) => {
                    const active = getDndItem(event.active.id);
                    const over = getDndItem(event.over?.id);

                    if (active) {
                        handleEnd(active, over);
                    }
                }}
            >
                {props.children}

                <DragOverlay>
                    {overlay}
                </DragOverlay>
            </DndContext>
        </Dnd.Provider>
    );
}
