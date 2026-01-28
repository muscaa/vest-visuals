"use client";

import { BreadcrumbsList } from "@/components/breadcrumbs";
import {
    createContext,
    useState,
} from "react";

export interface BreadcrumbsContext {
    breadcrumbs?: BreadcrumbsList;
    setBreadcrumbs?: (value: BreadcrumbsList | null) => void;
}

export const Breadcrumbs = createContext<BreadcrumbsContext>({});

interface BreadcrumbsContextProviderProps {
    children: React.ReactNode;
}

export function BreadcrumbsContextProvider(props: BreadcrumbsContextProviderProps) {
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsList>();

    return (
        <Breadcrumbs.Provider
            value={{
                breadcrumbs,
                setBreadcrumbs: (value) => setBreadcrumbs(value || undefined),
            }}
        >
            {props.children}
        </Breadcrumbs.Provider>
    );
}
