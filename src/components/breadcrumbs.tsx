"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

export type BreadcrumbsPage = [name: string, href: string];
export type BreadcrumbsList = [...pages: BreadcrumbsPage[], name: string];

interface BreadcrumbsProps {
    list: BreadcrumbsList;
}

export function Breadcrumbs(props: BreadcrumbsProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    props.list.slice(0, -1).map(([name, href], index) => (
                        <Fragment key={index}>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href={href}>
                                    {name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                        </Fragment>
                    ))
                }
                <BreadcrumbItem>
                    <BreadcrumbPage>{props.list.at(-1)}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
