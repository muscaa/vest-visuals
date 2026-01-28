"use client";

import {
    useContext,
    useEffect,
} from "react";
import { Breadcrumbs } from "@/contexts/breadcrumbs";
import { BreadcrumbsList } from "@/components/breadcrumbs";

export function useBreadcrumbs(list?: BreadcrumbsList | null) {
    const context = useContext(Breadcrumbs);

    useEffect(() => {
        if (!list) return;

        context.setBreadcrumbs?.(list);
    }, []); // TODO add list as dependency, but avoid maximum update depth error

    return context;
}
