"use client";

import {
    createContext,
    RefObject,
    useRef,
} from "react";

export interface MainContext {
    ref?: RefObject<HTMLDivElement | null>;
}

export const Main = createContext<MainContext>({});

interface MainContextProviderProps {
    children: React.ReactNode;
}

export function MainContextProvider(props: MainContextProviderProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <Main.Provider
            value={{
                ref,
            }}
        >
            {props.children}
        </Main.Provider>
    );
}
