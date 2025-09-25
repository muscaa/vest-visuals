"use client";

import {
    createContext,
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
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
    DndStartFunc,
    DndEndFunc,
    getDndId,
} from "@client/dnd";

export interface DndContext {
    useStart: (func: DndStartFunc) => void;
    useEnd: (func: DndEndFunc) => void;
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

    const startFuncs = useRef<Set<DndStartFunc>>(new Set());
    const endFuncs = useRef<Set<DndEndFunc>>(new Set());

    const useStart = (func: DndStartFunc) => useEffect(() => {
        startFuncs.current.add(func);

        return () => {
            startFuncs.current.delete(func);
        };
    }, []);

    const useEnd = (func: DndEndFunc) => useEffect(() => {
        endFuncs.current.add(func);

        return () => {
            endFuncs.current.delete(func);
        };
    }, []);

    return (
        <Dnd.Provider
            value={{
                useStart,
                useEnd,
            }}
        >
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={(event) => {
                    const active = getDndId(event.active.id);

                    if (active) {
                        for (const func of startFuncs.current) {
                            func(active);
                        }
                    }
                }}
                onDragEnd={(event) => {
                    const active = getDndId(event.active.id);
                    const over = getDndId(event.over?.id);

                    if (active) {
                        for (const func of endFuncs.current) {
                            func(active, over);
                        }
                    }
                }}
            >
                {props.children}

                {/* <DragOverlay>
                    {
                        Overlay && (
                            <Overlay />
                        )
                    }
                </DragOverlay> */}
            </DndContext>
        </Dnd.Provider>
    );
}
